import * as express from "express";
const statusMessages = require("../../statusMessages");
const { uploadFile } = require("../../common");
const router = express.Router();

router.post(
    "/",
    uploadFile.single("file"),
    (req: express.Request, res: express.Response) => {
        const { user_idx } = res.locals.decoded;
        if (req.file) {
            res.status(201).send({
                ...statusMessages.created,
                dataSource: {
                    url: req.file.path,
                },
            });
        } else {
            res.status(400).send(statusMessages.badRequest);
        }
    }
);

module.exports = router;
