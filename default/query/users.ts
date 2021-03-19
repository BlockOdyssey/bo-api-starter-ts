const { query } = require("../config");

interface user {
    user_idx: number;
}

exports.get = (obj: user) => {
    const sql = `
        SELECT
            *
        FROM
            TB_UI_USER
        WHERE
            user_idx = '${obj.user_idx}';
    `;
    return query(sql);
};
