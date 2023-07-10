const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign({ id: user }, process.env.JWT_SECRET);
  return accessToken;
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json("unauthorized");
      }else{
        req._id = decoded;
        next();
      }
    });
  } else {
    
    res.json("unauthorized");
  }
};
const createDoctorTokens = (user) => {
  const accessToken = sign({ id: user }, process.env.JWT_SECRET);
  return accessToken;
};

const validateDoctorToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json("unauthorized");
      }
      req._id = decoded;
      next();
    });
  } else {
    res.json("unauthorized");
  }
};
const createAdminTokens = (user) => {
  const accessToken = sign({ id: user }, process.env.JWT_SECRET);
  return accessToken;
};

const validateAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json("unauthorized");
      }
      req._id = decoded;
      next();
    });
  } else {
    res.json("unauthorized");
  }
};

module.exports = {
  createTokens,
  createDoctorTokens,
  createAdminTokens,
  validateToken,
  validateAdminToken,
  validateDoctorToken,
};
