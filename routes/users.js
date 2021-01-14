const router = require("express").Router();
const { User, validateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const validateCredentials = (body) => {
  const credentials = Joi.object({
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return credentials.validate(body);
};

router.get("/", [auth, admin], async (req, res) => {
  const users = await User.find().select({ __v: 0 });
  res.send(users);
});

router.post("/login", async (req, res) => {
  const { error } = validateCredentials(req.body);
  if (error) return res.status(400).send(error.message);

  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user) return res.status(404).send("Invalid username or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(404).send("Invalid username or password.");

  res.send({ token: user.generateAuthToken() });
});

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.message);

  const { firstname, lastname, username, password, email } = req.body;

  if (await User.findOne({ username }))
    return res.status(401).send("The user with this username exists.");

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const user = await new User({
    firstname,
    lastname,
    username,
    password: hashedPassword,
    email,
  }).save();

  res
    .header("x-auth-token", user.generateAuthToken())
    .header("access-control-expose-headers", "x-auth-token")
    .send({ username, email });
});

module.exports = router;
