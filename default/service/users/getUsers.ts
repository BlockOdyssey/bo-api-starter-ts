const { get } = require("../../query/users");

interface userData {
    user_idx: number;
}

exports.getUsers = async (obj: userData) => {
    console.log("service getUsers :: ", obj);

    // 쿼리 실행
    const user = await get(obj);
    return user;
};
