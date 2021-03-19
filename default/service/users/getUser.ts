const { find } = require("../../query/users");

interface userData {
    user_idx: number;
}

exports.getUser = async (obj: userData) => {
    console.log("service getUser :: ", obj);

    // 쿼리 실행
    const user = await find(obj);
    return user;
};
