const { s3, s3_bucket } = require("./config");
import * as multer from "multer";
import * as multerS3 from "multer-s3";
import * as path from "path";
const xlsx = require("xlsx");

// S3 파일 업로드 (middleware로 붙여서 사용)
// 파일 하나만 업로드 할 경우 : uploadFile.single(필드명) -> 업로드 된 파일 정보는 req.file에 있음. 파일 URL은 req.file.path로 가져올 것
// 여러 개의 파일을 업로드 할 경우 : uploadFile.array(필드명, 최대 파일 갯수) -> 업로드 된 파일 정보는 req.files에 있음
const uploadFile: multer.Multer = multer({
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

// 엑셀 파일 생성
const makeExcel = async (data: Array<object>, sheetName: string) => {
    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, sheetName);
    const wbOut = xlsx.write(wb, {
        bookType: "xlsx",
        type: "buffer",
    });
    return wbOut;
};

// 이메일 주소 검증
const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        return true;
    } else {
        return false;
    }
};

// 마지막 콤마 제거
const removeComma = (data: string): string => {
    if (data.endsWith(",")) {
        return data.slice(0, -1);
    } else {
        return data;
    }
};

module.exports = {
    uploadFile,
    makeExcel,
    validateEmail,
    removeComma,
};
