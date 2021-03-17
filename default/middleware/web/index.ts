import * as express from "express";
import * as jwt from "jsonwebtoken";
const config = require("../../config");
const statusMessages = require("../../statusMessages");
const secret = config.jwtSecret;

// middle-ware settings
const webMw = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Content-Length, Authorization, Origin, Accept, X-Requested-With, user_idx, token"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    console.log("web middleware ---");

    const token = req.get("token");
    jwt.verify(token, secret, (err: jwt.VerifyErrors, decoded: object) => {
        if (err) {
            res.status(401).send(statusMessages.unauthorized);
        } else {
            res.locals.decoded = decoded;
            next();
        }
    });
};

module.exports = webMw;
