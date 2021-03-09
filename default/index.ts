import * as express from "express";
const app = express();
const { PORT } = process.env;

const webRoutes = require("./routes/web");
const appRoutes = require("./routes/app");
const webMw = require("./middleware/webMw");
const appMw = require("./middleware/appMw");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/web", webMw, webRoutes);
app.use("/app", appMw, appRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
