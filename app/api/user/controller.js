import util from "../../../utils/util";
import validator from "./validator";
import service from "./service";
async function login(params) {
  const { username } = params;
  let result;

  if (username) {
    result = await service.userLogin(params);
  }
  return result;
}
/**
 * create new user (user sign up )
 * @property {string} params.name - The name of user.
 * @property {string} params.username - The username of the user.
 * @property {string} params.password - The password of the user.
 */
async function create(body) {
  // Validating body

  const validData = await validator.create.validate({ body });

  const validBody = validData.body;

  const promiseList = [];

  if (validBody.username) {
    // Checking if document exist with same reference
    promiseList.push(service.findByUsername(validBody.username));
  }

  // Waiting for promises to finish
  const promiseListResp = await Promise.all(promiseList);

  // Throwing error if promise response has any error object
  util.FilterErrorAndThrow(promiseListResp);

  // call create service  to insert data in user table
  const result = await service.create(validBody);
  util.FilterErrorAndThrow(result);
  return result;
}

async function list() {
  const result = await service.list();
  return result;
}

async function remove(params) {
  // Validating param
  const validParam = await validator.remove.validate({ params });

  const result = await service.remove(validParam.params);
  return result;
}

async function get(params) {
  const result = await service.getById(params);
  return result;
}

async function update({ id }, body) {
  const result = await service.update(id, body);
  return result;
}
export default { login, create, remove, list, get, update };
