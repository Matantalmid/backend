const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
  try {
    const userToken = req.headers["authorization"];
    console.log(userToken);
    if (!userToken) return res.status(401).send("unAuthoriztion");
    const token = userToken.split(" ")[1];
    console.log(token);
    const decoded = verifyToken(token);
    console.log(decoded);
    if (!decoded) return res.status(401).send("unAuthoriztion");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};

const authorize = (roles) => {
  console.log(roles);
  return (req, res, next) => {
    const user = req.user;
    //if (user.roles === role) next()
    if (roles.includes(user.role)) next();
    else return res.status(401).send("UnAuthorized");
  };
};

module.exports = { auth, authorize };
