import { StatusCodes } from 'http-status-codes';

export default function errorHandlingMiddleware(err, req, res, next) {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack,
  };
  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi
  // if (env.BUILD_MODE !== 'dev') delete responseError.stack
  res.status(responseError.statusCode).json(responseError);
}
