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

const validateCreateTicket = (data) => {
  const errors = {};

  if (
    !data.title ||
    !validator.isLength(data.title.trim(), { min: 3, max: 150 })
  ){
    errors.title = "Title must be between 3 and 150 characters";
  }

  if(
    !data.description ||
    !validator.isLength(data.description.trim(), { min: 10, max: 5000 })
  ){
    errors.description = "Description must be between 10 and 5000 characters";
  }

  if(!data.category || !data.category.trim()){
    errors.category = "Category is required";
  }

  const allowedPriorities=["Low", "Medium", "High", "Critical"];

  if(data.priority && !allowedPriorities.includes(data.priority)){
    errors.priority = "Invalid priority";
  }

  if(data.attachments !== undefined && !Array.isArray(data.attachments)){
    errors.attachments = "Attachments must be an array";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports={validateCreateTicket,validate};

