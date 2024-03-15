const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
//   const token = req.header.authorization;
  const token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, "yogesh", (err, decode) => {
        if (err) {
          res.status(400).json({ msg: "You are passing wrong credencail" });
        } else {
          console.log(decode);
          req.body.userID= decode.userID,
          req.body.username = decode.username,
          next();
        }
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "Please login" });
  }
};

module.exports = {
  auth,
};
