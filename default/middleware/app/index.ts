import * as express from "express";

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

    next();
};

module.exports = appMw;
