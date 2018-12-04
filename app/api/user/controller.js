import util from "../../../utils/util";
import validator from "./validator";
import service from "./service";

/**
 *
 *  @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @returns {Object}
 */
async function login(body) {
  // validating body
  const validBody = await validator.login.validate({ body });

  // fetching username from validated body
  const { username } = validBody.body;

  // define variabe result to store the result.
  let result;

  // to check user existence.
  if (username) {
    // call userLogin service.
    result = await service.userLogin(validBody.body);
  }
  // return result to control handler to send success response
  return result;
}

/**
 * create new user (user sign up )
 * @property {string} name - The name of user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
async function create(body) {
  // Validating body
  const validData = await validator.create.validate({ body });

  // fetch validated body from validData
  const validBody = validData.body;

  // define variable promiseList.
  const promiseList = [];

  // checking for username existence in users.
  if (validBody.username) {
    // Checking if record exist with same reference
    promiseList.push(service.findByUsername(validBody.username));
  }

  // Waiting for promises to finish
  const promiseListResp = await Promise.all(promiseList);

  // Throwing error if promise response has any error object
  util.FilterErrorAndThrow(promiseListResp);

  // call create service  to insert data in user table
  const result = await service.create(validBody);

  // throw error if result is not an object
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response
  return result;
}

/**
 * Get Users List
 * @returns {Object}
 */
async function list() {
  // calling list service to fetch comment list.
  const result = await service.list();

  // return result to control handler to send success response.
  return result;
}
/**
 * Delete User
 * @property {integer} id - User Id.
 * @returns {Object}
 */
async function remove(params) {
  // Validating param
  const validParam = await validator.remove.validate({ params });

  // calling remove service to delete the record.
  const result = await service.remove(validParam.params);

  // throw error if result is not an object
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response.
  return result;
}

/**
 *  get User By Id
 * @property {integer} id - User Id.
 * @returns {Object}
 */
async function getById(params) {
  // Validating param
  const validParam = await validator.get.validate({ params });

  // Getting user details by id
  const result = await service.findById(validParam.params);

  // throw error if result is not an object.
  util.FilterErrorAndThrow(result);

  // return result to control handler to send success response.
  return result;
}

/**
 * Update existing user
 * @property {integer} id - User Id
 * @property {string} name - The name of user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 * @returns {Object}
 */
async function update(params, body) {
  // Validating param
  const validParam = await validator.update.validate({ params });

  // get id from params
  const { id } = validParam.params;

  // check for existence of  User Object to be updated.
  const existingData = await service.findById({ id });

  // Throwing error if promise response has any error object
  util.FilterErrorAndThrow(existingData);

  // validating body
  const validData = await validator.update.validate({ body });

  // fetching body from validData
  const validBody = await validData.body;

  // define variable promiseList
  const promiseList = [];

  // checking for username existence in users.
  if (validBody.username) {
    // Checking if record exist with same reference
    promiseList.push(service.findByUsername(validBody.username));
  }

  // Waiting for promises to finish
  const promiseListResp = await Promise.all(promiseList);

  // Throwing error if promise response has any error object
  util.FilterErrorAndThrow(promiseListResp);

  // Updating  data to record
  const updatedData = await service.update(id, body);

  // throw error if result is not an object
  util.FilterErrorAndThrow(updatedData);

  // return result to control handler to send success response
  return updatedData;
}
export default { login, create, remove, list, getById, update };
