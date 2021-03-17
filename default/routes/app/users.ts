import * as express from "express";
const { users } = require("../../service/index");
const statusMessages = require("../../statusMessages");
const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
    const { user_idx } = res.locals.decoded;
    const result = await users.findUser({ user_idx });
    console.log(result);

    if (result) {
        res.status(200).json({ ...statusMessages.ok, dataSource: result });
    } else {
        res.status(404).json(statusMessages.notFound);
    }
});

module.exports = router;
