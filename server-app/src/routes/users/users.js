const router = require("express").Router();
const security = require("../../security");
const Joi = require("joi");
const validateUser = require("../../routes/validation/validateUser");
const db = require("../../startup/db");
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");

/* Authentication/Authorization */

const validateCredentials = (body) => {
  return Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  }).validate(body);
};

router.get("/", [auth, admin], async (req, res) => {
  const users = await db.getAllUsers();
  return res.send(users);
});

router.post("/login", async (req, res) => {
  const { error } = validateCredentials(req.body);
  if (error) return res.status(400).send(error.message);

  const { username, password } = req.body;

  let user = await db.getUserByUsername(username);
  if (!user) return res.status(401).send("Invalid username or password.");

  const validPassword = await security.verifyPassword(password, user.password);
  if (!validPassword) return res.status(401).send("Invalid username or password.");

  return res.send({ token: user.generateAuthToken() });
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  const { firstname, lastname, username, password, email } = req.body;

  const user = await db.getUserByUsername(username);
  if (user) return res.status(400).send("The user with this username already exists.");

  const hashedPassword = await security.hashPassword(password);

  const newUserInfo = { firstname, lastname, username, password: hashedPassword, email };
  const newUser = await db.saveNewUser(newUserInfo);

  return res
    .header("x-auth-token", newUser.generateAuthToken())
    .header("access-control-expose-headers", "x-auth-token")
    .send({ username, email });
});

module.exports = router;
