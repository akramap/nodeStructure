import jwt from "jsonwebtoken";
// import database configurations from config/development.json.
import config from "../../../config/development";
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

async function isLoggedIn(req, res, next) {
  const { token } = req.cookies;

  const decoded = await jwt.verify(token, config.jwt.secret);
  if (decoded.userObj.isAdmin === 1) {
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
};
