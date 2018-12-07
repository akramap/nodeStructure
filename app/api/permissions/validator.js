import Joi from "joi";
// import constants from "../../helpers/constants";
import commonValidator from "../../helpers/validators/commonValidator";

export default {
  // GET /api/permission/:id
  get: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // POST /api/permission/addpermission
  create: Joi.object({
    body: Joi.object({
      permission: Joi.object().required(),
      roleId: commonValidator.validMysqlId.required(),
      userId: commonValidator.validMysqlId.required(),
    }),
  }),

  // DELETE /api/permission/:id
  remove: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // PUT /api/permission/:id
  update: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
    body: Joi.object({
      permission: Joi.object(),
      roleId: commonValidator.validMysqlId,
      userId: commonValidator.validMysqlId,
    }),
  }),
};
