const statusMessages = {
    ok: {
        result: "success",
        dataSource: null,
    },
    created: {
        result: "success",
        message: "데이터를 성공적으로 변경하였습니다.",
    },
    badRequest: {
        result: "fail",
        message: "잘못된 요청입니다.",
    },
    unauthorized: {
        result: "fail",
        message: "인증에 실패하였습니다.",
    },
    notFound: {
        result: "fail",
        message: "데이터가 존재하지 않습니다.",
    },
    conflict: {
        result: "fail",
        message: "중복된 데이터입니다.",
    },
    internalError: {
        result: "fail",
        message: "서버 내부 오류입니다.",
    },
};

module.exports = statusMessages;
