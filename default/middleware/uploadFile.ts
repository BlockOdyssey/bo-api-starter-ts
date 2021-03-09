import * as config from "../config";
import * as multer from "multer";
import * as multerS3 from "multer-s3";
const s3 = config.default.s3;
const s3_bucket = config.default.s3_bucket;

const uploadFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3_bucket,
    metadata: (req: Express.Request, file: Express.Multer.File, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req: Express.Request, file: Express.Multer.File, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

export default uploadFile;
