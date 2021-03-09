import * as users from "../../query/users";
const find = users.default.find;

interface user {
  email: string;
}

const findUser = async (obj: user) => {
  console.log("service findUser :: ", obj);

  // 로직 작성은 여기서
  if (obj.email) {
    console.log("email로 조회하기");
  }

  // 쿼리 실행
  const user = await find(obj);

  return user;
};

export default findUser;
