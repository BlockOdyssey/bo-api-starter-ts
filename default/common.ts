const { s3, s3_bucket } = require("./config");
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import * as path from "path";

// S3 파일 업로드 (middleware로 붙여서 사용)
// 파일 하나만 업로드 할 경우 : uploadFile.single(필드명)
// 여러 개의 파일을 업로드 할 경우 : uploadFile.array(필드명, 파일 갯수)
const uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: s3_bucket,
        metadata: (req: Express.Request, file: Express.Multer.File, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req: Express.Request, file: Express.Multer.File, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        acl: "public-read-write",
    }),
});

module.exports = {
    uploadFile,
};
