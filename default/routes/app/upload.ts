import * as express from "express";
const statusMessages = require("../../statusMessages");
const uploadFile = require("../../middleware/common/uploadFile");
const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
    const { user_idx } = res.locals.decoded;
    try {
        await uploadFile.single("file");
        res.status(201).send({
            ...statusMessages.created,
            dataSource: {
                url: req.file.path,
            },
        });
    } catch (err) {
        res.status(400).send(statusMessages.badRequest);
    }
});

module.exports = router;
