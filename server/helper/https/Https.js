const handlerCode = require("../../config/errors/Errors");
const https = {
  success: (res, data, message = "") => {
    return res.status(handlerCode.CODE_200).json({
      data: data,
      message: message || handlerCode.MSG_200,
      code: handlerCode.CODE_200,
    });
  },
  forbidden: (res, message) => {
    return res.status(handlerCode.CODE_403).json({
      message: message || handlerCode.MSG_403,
      code: handlerCode.CODE_403,
    });
  },
  fail: (res, data, message = "") => {
    return res.status(handlerCode.CODE_400).json({
      data: data,
      message: message || handlerCode.MSG_400,
      code: handlerCode.CODE_400,
    });
  },
  unauthorized: (res) => {
    return res.status(handlerCode.CODE_401).json({
      message: handlerCode.MSG_401,
      code: handlerCode.CODE_401,
    });
  },
  serverError: (res, message) => {
    return res.status(handlerCode.CODE_500).json({
      message: message || handlerCode.MSG_500,
      code: handlerCode.CODE_500,
    });
  },
};
module.exports = https;
