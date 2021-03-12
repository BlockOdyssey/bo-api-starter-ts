import * as jwt from "jsonwebtoken";
import * as express from "express";
const config = require("../../config");
const secret = config.jwtSecret;

// ref : https://stackoverflow.com/questions/35955217/returning-an-object-from-middleware-function-in-node-js

const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.get("token");
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          status: "fail",
          message: "사용자 인증에 실패하였습니다.",
        });
      } else {
        next(decoded);
      }
    });
  } else {
    res.status(401).send({
      status: "fail",
      message: "유효하지 않은 토큰입니다.",
    });
  }
};

module.exports = verifyToken;
