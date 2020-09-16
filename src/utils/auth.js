import jwt from "jsonwebtoken";
import { errorStatusHandle } from "./error";
import _ from "lodash";

const handleJWTError = (res, error) => {
  switch (error) {
    case "TokenExpiredError":
      return errorStatusHandle(res, "TOKEN_EXPIRADO");
    case "JsonWebTokenError":
      return errorStatusHandle(res, "TOKEN_ERROR");
    case "NotBeforeError":
      return errorStatusHandle(res, "TOKEN_INACTIVO");
    default:
      break;
  }
};

module.exports = (req, res, next) => {
  const token = req.header("token");

  if (!token) return errorStatusHandle(res, "UNAUTHORIZED");

  let error;
  const cifrado = jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (!_.isEmpty(err)) error = err.name;
    else return decoded;
  });

  if (error) return handleJWTError(res, error);
  else {
    req.usuario = cifrado.usuario;
    next();
  }
};
