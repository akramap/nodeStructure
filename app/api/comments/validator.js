import Joi from "joi";
// import constants from "../../helpers/constants";
import commonValidator from "../../helpers/validators/commonValidator";

export default {
  // GET /api/comment/:id
  get: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),

  // POST /api/comment/addComment
  create: Joi.object({
    body: Joi.object({
      comment: commonValidator.longStr.required(),
      userId: commonValidator.validMysqlId.required(),
      postId: commonValidator.validMysqlId.required(),
      commentId: commonValidator.validMysqlId,
      status: commonValidator.postStatusType,
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
      comment: commonValidator.longStr.required(),
      userId: commonValidator.validMysqlId,
      postId: commonValidator.validMysqlId,
    }),
  }),
};
