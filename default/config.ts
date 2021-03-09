import { Connection } from "mysql";
import * as aws from "aws-sdk";
import * as mysql from "mysql";

require("dotenv").config({
  path: ((): string => {
    // return `../.env`; 서버 경로
    return `./.env`; // 로컬경로
  })(),
});

const {
  NODE_ENV,
  PORT,
  TLSPORT,
  ORIGIN,
  S3_HOST,
  S3_BUCKET,
  S3_ACCESSKEYID,
  S3_SECRETACCESSKEY,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSPORT,
  MYSQL_PORT,
  MYSQL_DATABASE,
} = process.env;
//환경
const isDev: boolean = NODE_ENV === "development";
const isProd: boolean = NODE_ENV === "production";
const port: string = PORT;
const tlsPort: string = TLSPORT;
const origin: string = ORIGIN;

//aws
const s3_host: string = S3_HOST;
const s3_bucket: string = S3_BUCKET;
aws.config.update({
  accessKeyId: S3_ACCESSKEYID,
  secretAccessKey: S3_SECRETACCESSKEY,
  region: "ap-northeast-2",
});
const s3: aws.S3 = new aws.S3();

//mysql
const connection: Connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSPORT,
  port: Number(MYSQL_PORT),
  database: MYSQL_DATABASE,
});

connection.connect();

const query = (sql: string, values?: any): Promise<unknown> =>
  new Promise((resolve, reject) => {
    console.log(sql);
    connection.query(sql, values, (err: mysql.MysqlError, rows: any) => {
      err ? reject(err) : resolve(rows);
    });
  });

export default {
  s3,
  s3_bucket,
  s3_host,
  port,
  tlsPort,
  isDev,
  isProd,
  connection,
  query,
  origin,
};
