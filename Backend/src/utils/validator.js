const validator = require("validator");

const validate = (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak");
  }

  return true;
};

module.exports = validate;