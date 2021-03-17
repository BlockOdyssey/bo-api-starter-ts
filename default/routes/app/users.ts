import * as express from "express";
const { users } = require("../../service/index");
const statusMessages = require("../../statusMessages");
const verifyToken = require("../../middleware/common/verifyToken");
const router = express.Router();

interface decodedData {
    user_idx: number;
}

router.get("/", async (req: express.Request, res: express.Response) => {
    verifyToken(req, res, async (decoded: decodedData) => {
        const { user_idx } = decoded;
        const result = await users.findUser({ user_idx });
        console.log(result);

        if (result) {
            res.status(200).json({ ...statusMessages.ok, dataSource: result });
        } else {
            res.status(404).json(statusMessages.notFound);
        }
    });
});

module.exports = router;
