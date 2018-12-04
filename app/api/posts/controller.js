import util from "../../../utils/util";
import validator from "./validator";
import service from "./service";

/**
 * Insert post details
 * @property {text} content - content posted by user.
 * @property {integer} userId - primary Id of User.
 * @returns {Object}
 */

async function create(body) {
  // validating body
  const validData = await validator.create.validate({ body });

  // fetch validated body from validData
  const validBody = validData.body;

  // call create service  to insert data in post table/to post the contents.
  const result = await service.create(validBody);

  // throw error if result is not an object
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response
  return result;
}

/**
 * Get posts List
 * @returns {Object}
 */
async function list() {
  // calling list service to fetch post list
  const result = await service.list();

  // return result to control handler to send success response
  return result;
}

/**
 * Delete  post list
 * @property {integer} params.id - posts Id.
 * @returns {Object}
 */
async function remove(params) {
  // Validating param
  const validParam = await validator.remove.validate({ params });

  // calling remove service to delete the record.
  const result = await service.remove(validParam.params);

  // throw error if result is not an object.
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response
  return result;
}

/**
 *  get post By Id
 * @property {integer} params.id - post Id.
 * @returns {Object}
 */
async function getById(params) {
  // Validating param
  const validParam = await validator.get.validate({ params });

  // Getting post details by id by calling its service.
  const result = await service.findById(validParam.params);

  // throw error if result is not an object.
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response.
  return result;
}

/**
 * @property {text} content - contents posted by user.
 * @property {integer} userId - primary Id of User.
 * @returns {Object}
 */
async function update(params, body) {
  // Validating params
  const validParam = await validator.update.validate({ params });

  // get id from params
  const { id } = await validParam.params;

  // check for existence of  post Object to be updated
  const existingData = await service.findById({ id });

  // Throwing error if promise response has any error object
  util.FilterErrorAndThrow(existingData);

  // validating body
  const validData = await validator.update.validate({ body });
  const validBody = await validData.body;

  // Updating new data to record.
  const updatedData = await service.update(id, validBody);

  // throw error if result is not an object
  util.FilterErrorAndThrow(updatedData);

  // return result to control handler to send success response
  return updatedData;
}

export default { create, remove, list, getById, update };
