// { title, price, authors }

const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  price: Joi.number().required(),
  authors: Joi.array().items(Joi.string().min(3).max(30)).min(1).required(),
});

function validateBook(req, res, next) {
  const book = { ...req.body };
  const { error } = bookSchema.validate(book);
  if (error) return res.status(409).json(error);
  else next();
}

module.exports =  validateBook;
