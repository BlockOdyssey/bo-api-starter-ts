const { query } = require("../config");

interface user {
    user_idx: number;
}

exports.find = (obj: user) => {
    let sql = `
        SELECT
            *
        FROM
            TB_UI_USER
        WHERE
            user_idx = '${obj.user_idx}';
    `;
    console.log(sql);
    return query(sql);
};
