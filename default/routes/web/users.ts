import * as express from "express";
import services from "../../service/index";
const router = express.Router();
const users = services.users;

router.get("/", async (req: express.Request, res: express.Response) => {
  const email = req.query.email as string;

  const result = await users.findUser({ email });

  console.log(result);

  if (result) {
    return res.status(200).json({
      result: "Success",
    });
  }
});

export default router;
