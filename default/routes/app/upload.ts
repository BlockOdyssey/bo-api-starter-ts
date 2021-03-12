import * as express from "express";
const uploadFile = require("../../middleware/common/uploadFile");
const verifyToken = require("../../middleware/common/verifyToken");
const router = express.Router();

router.post("/", (req: express.Request, res: express.Response) => {
  verifyToken(req, res, async (decoded) => {
    await uploadFile.single("file");
    res.status(201).send({
      url: req.file.path,
    });
  });
});

module.exports = router;
