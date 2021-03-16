import * as express from "express";
const uploadFile = require("../../middleware/common/uploadFile");
const verifyToken = require("../../middleware/common/verifyToken");
const router = express.Router();

interface decodedData {
    email: string;
    iat: number;
}

router.post("/", (req: express.Request, res: express.Response) => {
    verifyToken(req, res, async (decoded: decodedData) => {
        const { email } = decoded;
        try {
            await uploadFile.single("file");
            res.status(201).send({
                status: "success",
                dataSource: {
                    url: req.file.path,
                },
            });
        } catch (err) {
            res.status(400).send({
                status: "fail",
                message: "파일 업로드를 실패하였습니다.",
            });
        }
    });
});

module.exports = router;
