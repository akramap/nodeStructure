import util from "../../../utils/util";
import validator from "./validator";
import service from "./service";

/**
 * Insert permissions details.
 * @property {text} permissions - permissions by user.
 * @property {integer} userId - primary Id of User.
 * @property {integer} postId - prmary Id of posts
 * @returns {Object}
 */

async function create(body) {
  // validating body
  const validData = await validator.create.validate({ body });

  // fetch validated body from validData
  const validBody = validData.body;

  // call create service  to insert data in permissions table / to post the permissions
  const result = await service.create(validBody);

  // throw error if result is not an object
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response
  return result;
}

/**
 * Get permissions List
 * @returns {Object}
 */
async function list() {
  // calling list service to fetch permissions list
  const result = await service.list();

  // return result to control handler to send success response
  return result;
}

/**
 * Delete permissions list
 * @property {integer} params.id - permissions Id.
 * @returns {Object}
 */
async function remove(params) {
  // Validating param
  const validParam = await validator.remove.validate({ params });

  // calling remove service to delete the record
  const result = await service.remove(validParam.params);

  // throw error if result is not an object
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response
  return result;
}

/**
 *  get permissions By id along with models associated with permissions model.
 * @property {integer} params.id - permissions Id.
 * @returns {Object}
 */
async function getById(params) {
  // Validating param
  const validParam = await validator.get.validate({ params });

  // Getting permissions details by id
  const result = await service.findById(validParam.params);

  // throw error if result is not an object
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response
  return result;
}

/**
 * @property {integer} params.id - permissions  Id.
 * @property {string} permissions - permissions user.
 * @property {integer} userId - primary Id of User.
 * @property {integer} postId - prmary Id of posts
 * @returns {Object}
 */
async function update(params, body) {
  // Validating params
  const validParam = await validator.update.validate({ params });

  // get id from params
  const { id } = await validParam.params;

  // check for existence of  permissions Object to be updated
  const existingData = await service.findById({ id });

  // Throwing error if promise response has any error object
  util.FilterErrorAndThrow(existingData);

  // validating body
  const validData = await validator.update.validate({ body });

  // fetching body from validData
  const validBody = await validData.body;

  // Updating new data  to existing record
  const updatedData = await service.update(id, validBody);

  // throw error if result is not an object
  util.FilterErrorAndThrow(updatedData);

  // return result to control handler to send success response
  return updatedData;
}

export default { create, remove, list, getById, update };
