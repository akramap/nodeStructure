// import models list from database/index.
import database from "../../database/index";
// import common service module.
import commonMysqlService from "../../helpers/services/commonMysqlService";

/**
 * @property {text} content - content posted by user.
 * @property {integer} userId - primary Id of User.
 * @returns {Object}
 */
async function create(body) {
  // calling common create service to post the content.
  const result = await commonMysqlService.create(database.comment, body);

  // return the result to controller.
  return result;
}

/**
 * Get post List
 * @returns {Object}
 */
async function list() {
  // calling common list service to get the post list.
  const result = await commonMysqlService.list(database.posts);

  // return the result to controller.
  return result;
}

/**
 * Delete post
 * @property {integer} params.id - post Id.
 * @returns {Object}
 */
async function remove({ id }) {
  // calling common remove service to delete the post by id.
  const result = await commonMysqlService.remove(database.posts, id);

  // return the result to controller.
  return result;
}

/**
 *  get posts  By Id
 * @property {integer} params.id - post Id.
 * @returns {Object}
 */
async function findById({ id }) {
  // calling common findById service to get the comment by id.
  const result = await commonMysqlService.findById(database.posts, id);

  // return the result to controller.
  return result;
}

/**
 * Update existing post
 * @property {integer} params.id - posts Id
 * @property {text} content - content posted by user.
 * @property {integer} userId - primary Id of User.
 * @returns {Object}
 */
async function update(id, body) {
  // calling common update service to update the comment to existing record.
  const result = await commonMysqlService.update(database.posts, body, id);

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
