const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  if (req.headers.authorization === undefined)
    return res.status(403).json({
      status: "Error",
      message: "not authorized. no token provided",
    });
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err)
      return res.status(401).json({
        status: "Error",
        message: "not authorized. the token is not valid",
      });
    else {
      req.decodedToken = decodedToken;
      console.log(decodedToken);

      next();
    }
  });
};
