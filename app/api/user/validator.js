import Joi from "joi";
// import constants from "../../helpers/constants";
import commonValidator from "../../helpers/validators/commonValidator";

export default {
  // GET /api/teams/:id
  get: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // POST /api/user/signup
  create: Joi.object({
    body: Joi.object({
      name: commonValidator.normalStr.required(),
      username: commonValidator.normalStr.required(),
      password: commonValidator.normalStr.required(),
      isAdmin: Joi.boolean(),
      isUser: Joi.boolean(),
    }),
  }),

  // DELETE /api/user/:id
  remove: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // PUT /api/user/:id
  update: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
    body: Joi.object({
      name: commonValidator.normalStr,
      username: commonValidator.normalStr,
      password: commonValidator.normalStr,
    }),
  }),

  // login /api/user/login
  login: Joi.object({
    body: Joi.object({
      username: commonValidator.normalStr.required(),
      password: commonValidator.normalStr.required(),
    }),
  }),
};
