import Joi from "joi";
// import constants from "../../helpers/constants";
import commonValidator from "../../helpers/validators/commonValidator";

export default {
  // GET /api/role/:id
  get: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // POST /api/role/addRole
  create: Joi.object({
    body: Joi.object({
      role: commonValidator.normalStr.required(),
      userId: commonValidator.validMysqlId.required(),
    }),
  }),

  // DELETE /api/role/:id
  remove: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // PUT /api/role/:id
  update: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
    body: Joi.object({
      role: commonValidator.normalStr,
      userId: commonValidator.validMysqlId,
    }),
  }),
};
