import Joi from "joi";
import constants from "../../helpers/constants";
import commonValidator from "../../helpers/validators/commonValidator";

export default {
  // GET /api/teams/:id
  get: Joi.object({
    params: Joi.object({
      id: commonValidator.validMongoId,
      feedSource: Joi.any().valid(constants.feedSourceTypes),
      key: Joi.string(),
    })
      .xor("id", "feedSource")
      .and("feedSource", "key"),
  }),

  // POST /api/user
  create: Joi.object({
    body: Joi.object({
      name: commonValidator.normalStr.required(),
      username: commonValidator.normalStr.required(),
      password: commonValidator.normalStr.required(),
    }),
  }),

  // DELETE /api/user/:id
  remove: Joi.object({
    params: Joi.object({
      id: commonValidator.validMysqlId.required(),
    }),
  }),
};
