import * as config from "../config";
const query = config.default.query;

const TABLE_NAME: string = "TB_UI_USER";

interface user {
  email: string;
}

const find = (obj: user) => {
  let sql = `
        SELECT
            *
        FROM
            ${TABLE_NAME}
        WHERE
            user_email = '${obj.email}';
    `;

  console.log(sql);

  return query(sql);
};

export default {
  find,
};
