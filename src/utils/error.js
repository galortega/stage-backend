import errors from "../constants/errors";
import { validationResult } from "express-validator/check";

export const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    // next(descripcion);
    console.error(error);
    return errorStatusHandle(res, "INTERNAL_SERVER_ERROR");
  }
};

export const allowedMethods = (methods = ["GET"]) => (req, res, next) => {
  if (methods.includes(req.method)) return next();
  res.set("Allow", methods);
  return errorStatusHandle(res, "METHOD_NOT_ALLOWED", { methods });
};

export const errorStatusHandle = (res, payload, other) => {
  const msg = errors[payload] || errors.INTERNAL_SERVER_ERROR;
  return res.status(msg.status).send({ error: { ...msg, ...other } });
};

export const checkParameters = (validators) => {
  const validatorFunction = (req, res, next) => {
    const checks = validationResult(req);
    if (!checks.isEmpty()) {
      return errorStatusHandle(res, "INVALID_PARAMS", {
        issues: checks.array({ onlyFirstError: true })
      });
    }
    return next();
  };
  return [...validators, validatorFunction];
};