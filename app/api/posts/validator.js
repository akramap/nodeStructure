import Joi from "joi";
//  import constants from "../../helpers/constants";
import commonValidator from "../../helpers/validators/commonValidator";

export default {
  // POST /api/posts/addPost
  create: Joi.object({
    body: Joi.object({
      content: commonValidator.longStr,
      userId: commonValidator.validMysqlId.required(),
    }),
  }),

  // GET /api/posts/:id
  get: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // DELETE /api/posts/:id
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
      content: commonValidator.longStr,
      userId: commonValidator.validMysqlId.required(),
    }),
  }),
};
