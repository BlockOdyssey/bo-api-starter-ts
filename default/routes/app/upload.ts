import * as express from "express";
const uploadFile = require("../../middleware/uploadFile");
const router = express.Router();

router.post(
  "/",
  uploadFile.single("file"),
  (req: express.Request, res: express.Response) => {
    res.status(201).send({
      url: req.file.path,
    });
  }
);

module.exports = router;
