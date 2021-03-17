import * as express from "express";
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const config = require("./config");

const { port = 3000, tlsport = 3001 } = config;

const options = {
    // key: fs.readFileSync(path.resolve(__dirname, "./certkey/key.key")),
    // cert: fs.readFileSync(path.resolve(__dirname, "./certkey/cert.crt")),
};

const webRoutes = require("./routes/web");
const appRoutes = require("./routes/app");
const webMw = require("./middleware/web");
const appMw = require("./middleware/app");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use("/web", webMw, webRoutes);
app.use("/app", appMw, appRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World!");
});

https.createServer(options, app).listen(tlsport, () => {
    console.log(`Server is running at port ${tlsport}`);
});

http.createServer(app).listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
