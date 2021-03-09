import * as express from "express";
import uploadFile from "../../middleware/uploadFile";
const router = express.Router();

router.post(
  "/upload",
  uploadFile.single("file"),
  (req: express.Request, res: express.Response) => {
    res.status(201).send({
      url: req.file.path,
    });
  }
);
