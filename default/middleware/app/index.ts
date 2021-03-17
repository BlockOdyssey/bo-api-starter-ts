import * as express from "express";
import * as jwt from "jsonwebtoken";
const config = require("../../config");
const statusMessages = require("../../statusMessages");
const secret = config.jwtSecret;

interface decodedToken {
    user_idx: number;
    iat: number;
}

const tokenCheckUrl: string[] = ["/upload", "/users"];

// middle-ware settings
const appMw = (
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

    console.log("app middleware ---");

    const checkParams = () => {
        if (req.body) {
            for (let i in req.body) {
                if (
                    req.body[i] === undefined ||
                    req.body[i] === null ||
                    req.body[i] === ""
                ) {
                    res.status(400).send(statusMessages.badRequest);
                }
            }
        } else if (req.query) {
            for (let i in req.query) {
                if (
                    req.query[i] === undefined ||
                    req.query[i] === null ||
                    req.query[i] === ""
                ) {
                    res.status(400).send(statusMessages.badRequest);
                }
            }
        }
    };

    if (tokenCheckUrl.includes(req.url)) {
        const token: string = req.get("token");
        if (token) {
            jwt.verify(
                token,
                secret,
                (err: jwt.VerifyErrors, decoded: decodedToken) => {
                    if (
                        err ||
                        !decoded.user_idx ||
                        decoded.user_idx === null ||
                        isNaN(decoded.user_idx)
                    ) {
                        res.status(401).send(statusMessages.unauthorized);
                    } else {
                        checkParams();
                        res.locals.decoded = decoded;
                        next();
                    }
                }
            );
        } else {
            res.status(401).send(statusMessages.unauthorized);
        }
    } else {
        checkParams();
        next();
    }
};

module.exports = appMw;
