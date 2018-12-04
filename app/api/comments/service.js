import database from "../../database/index";
import commonMysqlService from "../../helpers/services/commonMysqlService";

/**
 * @property {string} comment - comment by user.
 * @property {integer} userId - primary Id of User.
 * @property {integer} postId - prmary Id of posts
 * @returns {Object}
 */
async function create(body) {
  // calling common create service to post the comment
  const result = await commonMysqlService.create(database.comment, body);

  // return the result to controller.
  return result;
}

/**
 * Get comment List
 * @returns {Object}
 */
async function list() {
  // calling common list service to get the comment list.
  const result = await commonMysqlService.list(database.comment);

  // return the result to controller.
  return result;
}

/**
 * Delete comment
 * @property {integer} params.id - comment  Id.
 * @returns {Object}
 */
async function remove({ id }) {
  // calling common remove service to delete the comment by id.
  const result = await commonMysqlService.remove(database.comment, id);

  // return the result to controller.
  return result;
}

/**
 *  get comment   By Id
 * @property {integer} params.id - comment   Id.
 * @returns {Object}
 */
async function findById({ id }) {
  // calling common findById service to get the comment by id.
  const result = await commonMysqlService.findById(database.comment, id);

  // return the result to controller.
  return result;
}

/**
 * Update existing comment
 * @property {integer} params.id - comment  Id
 * @property {string} comment - comment by user.
 * @property {integer} userId -  Id of User.
 * @property {integer} postId - id of posts
 * @returns {Object}
 */
async function update(id, body) {
  // calling common update service to update the comment to existing record.
  const result = await commonMysqlService.update(database.comment, body, id);

  // return the result to controller.
  return result;
}

export default {
  create,
  remove,
  list,
  findById,
  update,
};
