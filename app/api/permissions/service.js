import database from "../../database/index";
import commonMysqlService from "../../helpers/services/commonMysqlService";

/**
 * @property {string} permissions - permissions by user.
 * @property {integer} userId - primary Id of User.
 * @property {integer} postId - prmary Id of posts
 * @returns {Object}
 */
async function create(body) {
  // calling common create service to post the permissions

  // body.permission = JSON.stringify(body.permission);
  const result = await commonMysqlService.create(database.permissions, body);

  // return the result to controller.
  return result;
}

/**
 * Get permissions List
 * @returns {Object}
 */
async function list() {
  // calling common list service to get the permissions list.
  const result = await commonMysqlService.list(database.permissions);

  // return the result to controller.
  return result;
}

/**
 * Delete permissions
 * @property {integer} params.id - permissions  Id.
 * @returns {Object}
 */
async function remove({ id }) {
  // calling common remove service to delete the permissions by id.
  const result = await commonMysqlService.remove(database.permissions, id);

  // return the result to controller.
  return result;
}

/**
 *  get permissions   By Id
 * @property {integer} params.id - permissions   Id.
 * @returns {Object}
 */
async function findById({ id }) {
  // calling common findById service to get the permissions by id.
  const result = await commonMysqlService.fetchByModels(database, id);

  // return the result to controller.
  return result;
}

/**
 * Update existing permissions
 * @property {integer} params.id - permissions  Id
 * @property {string} permissions - permissions by user.
 * @property {integer} userId -  Id of User.
 * @property {integer} postId - id of posts
 * @returns {Object}
 */
async function update(id, body) {
  // calling common update service to update the permissions to existing record.
  const result = await commonMysqlService.update(
    database.permissions,
    body,
    id,
  );

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
