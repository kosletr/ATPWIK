const bcrypt = require("bcrypt");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

function verifyPassword(actualPassword, testPassword) {
    return bcrypt.compare(actualPassword, testPassword);
}

module.exports = { hashPassword, verifyPassword };
