const JWT = require("jsonwebtoken");
const { addAdmin, selectAdmin } = require("../models/admin");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const admin = { name, email, password: hashedPassword };
    const result = await addAdmin(admin);

    if (result.isError)
      return res.status(409).json({
        status: "error",
        message: result.message,
      });
    else {
      return res.status(201).json(result);
    }
  } catch (err) {
    next(err);
  }

};


const login = async (req, res, next) => {
  try {

    const admin = { ...req.body };
    const queryResult = await selectAdmin({ email: admin.email });
  
    if (queryResult === null) {
      return res.status(404).json({
        message: "Email not found",
      });
    } else {
      const isValid = bcrypt.compareSync(admin.password, queryResult.password);
      const token = JWT.sign(
        {
          name: admin.name,
          email: admin.email,
        },
        process.env.JWT_KEY
      );
  
      if (isValid) {
        return res.status(200).json({ message: "Valid Password", token });
      } else {
        return res.status(401).json({ message: "Invalid Password" });
      }
    }
  } catch (err) {
    next(err)
  }
};

module.exports = { register, login };
