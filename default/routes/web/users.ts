import * as express from "express";
const { users } = require("../../service/index");
const verifyToken = require("../../middleware/common/verifyToken");
const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  verifyToken(req, res, async (decoded) => {
    const email = decoded.email;
    const result = await users.findUser({ email });
    console.log(result);

    if (result) {
      res.status(200).json({
        result: "success",
        message: result,
      });
    } else {
      res.status(409).json({
        result: "fail",
        message: "존재하지 않는 회원입니다.",
      });
    }
  });
});

module.exports = router;
