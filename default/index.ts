import * as express from "express";
const app = express();

import * as webRoutes from "./routes/web";
import * as appRoutes from "./routes/app";
import * as webMw from "./middleware/webMw";
import * as appMw from "./middleware/appMw";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/web", webMw.default);
for (let k in webRoutes) {
  app.use("/web/" + k, webRoutes[k]);
}

app.use("/app", appMw.default);
for (let k in appRoutes) {
  app.use("/app/" + k, appRoutes[k]);
}

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(4000, () => {
  console.log("Example app listening on port 4000!");
});
