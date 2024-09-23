const { login, register } = require("../controllers/admin");
const validateAdmin = require("../validation/admin");
const validateLogin = require("../validation/login");

const router = require("express").Router();

router.post("/login", validateLogin, login);

router.post("/register", validateAdmin, register);

module.exports = router;