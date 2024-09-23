const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateLogin(req, res, next) {
  const admin = { ...req.body };
  const { error } = loginSchema.validate(admin);
  if (error) return res.status(409).json(error);
  else next();
}

module.exports = validateLogin;
