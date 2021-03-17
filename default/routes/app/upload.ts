import * as express from "express";
const statusMessages = require("../../statusMessages");
const uploadFile = require("../../middleware/common/uploadFile");
const router = express.Router();

router.post(
    "/",
    uploadFile.single("file"),
    (req: express.Request, res: express.Response) => {
        const { user_idx } = res.locals.decoded;
        try {
            res.status(201).send({
                ...statusMessages.created,
                dataSource: {
                    url: req.file.path,
                },
            });
        } catch (err) {
            res.status(500).send(statusMessages.internalError);
        }
    }
);

module.exports = router;
