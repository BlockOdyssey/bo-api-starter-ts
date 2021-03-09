const { query } = require("../config");

const TABLE_NAME: string = "TB_UI_USER";

interface user {
  email: string;
}

exports.find = (obj: user) => {
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
