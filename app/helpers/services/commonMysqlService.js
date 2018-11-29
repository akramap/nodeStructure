import response from "../../../localization/en";

async function create(Model, params) {
  await Model.create(params);

  return { message: response.CREATED };
}

async function list(Model) {
  const result = await Model.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  return { data: result };
}
async function get(Model, id) {
  const result = await Model.findAll({
    where: {
      id,
    },
  });
  return { data: result };
}

async function remove(Model, id) {
  await Model.destroy({ where: { id } });
  return { message: response.DELETED };
}

async function update(Model, params, id) {
  await Model.update(params, {
    where: {
      id,
    },
  });
  return { message: response.UPDATED };
}

/**
 * Checking if document exist with reference
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

// async function find({ query, customFilters = false, autoFormat = true }) {
//   await database.user.findOne().then(found => {
//     return found;
//     // project will be the first entry of the Projects table with the title 'aProject' || null
//   });
// }

export default { create, remove, list, get, update, checkDuplicate };
