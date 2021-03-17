import * as express from "express";
const statusMessages = require("../../statusMessages");
const uploadFile = require("../../middleware/common/uploadFile");
const verifyToken = require("../../middleware/common/verifyToken");
const router = express.Router();

interface decodedData {
    user_idx: number;
}

router.post("/", (req: express.Request, res: express.Response) => {
    verifyToken(req, res, async (decoded: decodedData) => {
        const { user_idx } = decoded;
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
});

module.exports = router;
