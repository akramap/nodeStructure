import jwt from "jsonwebtoken";
// import database configurations from config/development.json.
import config from "../../../config/development";
import db from "../../database/index";
// import  response messages from localization/en file
import response from "../../../localization/en";

/**
 * insert new details
 * @property {string} Model - Model on which query to be performed.
 * @returns {Object}
 */
async function create(Model, params) {
  await Model.create(params);

  return { status: 200, message: response.CREATED };
}
/**
 * Get  List
 * @property {string} Model - Model on which query to be performed.
 * @returns {documents}
 */
async function list(Model) {
  const result = await Model.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return { status: 200, data: result };
}

/**
 *  get document By Id
 * @property {integer} params.id - model Id.
 * @returns {document}
 */
async function findById(Model, id) {
  const result = await Model.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: {
      id,
    },
  });
  return { status: 200, data: result };
}

/**
 *  get document of linked models By Id
 * @property {integer} params.id - model Id.
 * @property {string} modelFind - model from which records to be fetched.
 * @property {string} modelInclude - model associated with modelFind
 * @returns {document}.
 */
async function fetchByModels(Models, id) {
  const result = await Models.permissions.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Models.roles,
        include: [Models.user],
      },
    ],
    where: {
      id,
    },
  });
  return { status: 200, data: result };
}
/**
 * Delete record by id
 * @property {integer} params.id - model Id.
 * @returns {Object}
 */
async function remove(Model, id) {
  await Model.destroy({ where: { id } });
  return { status: 200, message: response.DELETED };
}

/**
 * Update existing document
 * @property {integer} params.id - model Id
 * @returns {Object}
 */
async function update(Model, params, id) {
  await Model.update(params, {
    where: {
      id,
    },
  });
  return { status: 200, message: response.UPDATED };
}

/**
 * Checking if document exist
 * @property {object} Model - mysql model object.
 * @property {string} username - The username of user.
 * @property {string} errKey - key for which error object will be generated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {boolean/document}
 */
async function checkDuplicate(Model, checkParam, autoFormat = true) {
  const existingUsername = await Model.findOne({
    where: checkParam,
  });
  if (existingUsername) {
    if (autoFormat) {
      const errObj = {
        error: {
          status: 409,
          message: response.ALREADY_EXIST,
          conflictKey: existingUsername.id,
          conflictObj: existingUsername,
        },
      };
      return errObj;
    }
    return existingUsername;
  }

  return true;
}

/**
 * To Authenticate through jwt for required API.
 * @property {object} req - cookie,baseUrl,method are fetched from req object.
 * @property {object} res.
 * @property {*} next
 */

async function isLoggedIn(req, res, next) {
  // get the cookies from request object.
  const { token } = req.cookies;
  // get the action like posts or comment.
  const reqUrl = req.baseUrl.split("/");

  // verify token using jwt.
  const decoded = await jwt.verify(token, config.jwt.secret);

  // fetch the permissions of the user.
  const userPermisson = await db.permissions.findOne({
    where: { userId: decoded.userObj.id },
  });
  // converting to string format.
  const permissionString = JSON.stringify(
    userPermisson.permission[reqUrl[2]][req.method],
  );

  if (permissionString === true) {
    return next();
  }

  return res.json({ message: response.INVALID_USER });
}

export default {
  create,
  remove,
  list,
  findById,
  update,
  checkDuplicate,
  isLoggedIn,
  fetchByModels,
};
