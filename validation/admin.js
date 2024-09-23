const Joi = require("joi");

const adminSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateAdmin(req, res, next) {
  const admin = { ...req.body };
  const { error } = adminSchema.validate(admin);
  if (error) return res.status(409).json(error);
  else next();
}

module.exports =  validateAdmin;
