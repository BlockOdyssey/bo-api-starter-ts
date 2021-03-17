const { find } = require("../../query/users");

interface userData {
    user_idx: number;
}

exports.findUser = async (obj: userData) => {
    console.log("service findUser :: ", obj);

    // 쿼리 실행
    const user = await find(obj);
    return user;
};
