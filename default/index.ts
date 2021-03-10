import * as express from "express";
const app = express();
const morgan = require("morgan");
const config = require("./config");
const { port = 3000 } = config;

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
