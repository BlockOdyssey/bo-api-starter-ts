const { query } = require("../config");

const TABLE_NAME: string = "TB_UI_USER";

interface user {
    user_idx: number;
}

exports.find = (obj: user) => {
    let sql = `
        SELECT
            *
        FROM
            ${TABLE_NAME}
        WHERE
            user_idx = '${obj.user_idx}';
    `;

    console.log(sql);

    return query(sql);
};
