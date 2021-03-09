import * as express from "express";
const app = express();
const { PORT } = process.env;

import * as webRoutes from "./routes/web";
import * as appRoutes from "./routes/app";
import * as webMw from "./middleware/webMw";
import * as appMw from "./middleware/appMw";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/web", webMw.default);
for (let k in webRoutes.default) {
  app.use("/web/" + k, webRoutes.default[k]);
}

app.use("/app", appMw.default);
for (let k in appRoutes.default) {
  app.use("/app/" + k, appRoutes.default[k]);
}

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
