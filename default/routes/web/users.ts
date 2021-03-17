import * as express from "express";
const { users } = require("../../service/index");
const statusMessages = require("../../statusMessages");
const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
    const { user_idx } = res.locals.decoded;
    try {
        const result = await users.findUser({ user_idx });
        if (result) {
            console.log(result);
            res.status(200).send({ ...statusMessages.ok, dataSource: result });
        } else {
            res.status(404).send(statusMessages.notFound);
        }
    } catch (err) {
        res.status(500).send(statusMessages.internalError);
    }
});

module.exports = router;
