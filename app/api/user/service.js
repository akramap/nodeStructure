import jwt from "jsonwebtoken";
import response from "../../../localization/en";
import database from "../database/index";
import config from "../../../config/development";
import commonMysqlService from "../../helpers/services/commonMysqlService";

async function userLogin(params) {
  const msg = {
    succes: response.SUCCESS,
    NOT_AUTHORIZED: response.NOT_AUTHORIZED,
    DOES_NOT_EXIST: response.DOES_NOT_EXIST,
  };
  const userObj = await database.user.findOne({ where: params });
  if (userObj) {
    if (userObj.password === params.password) {
      const payload = {
        data: userObj.password,
      };
      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: 1440, // expires in 24 hours
      });

      return { message: msg.succes, token };
    }

    return { message: msg.NOT_AUTHORIZED };
  }
  return { message: msg.DOES_NOT_EXIST };
}

async function create(params) {
  const result = await commonMysqlService.create(database.user, params);
  // const res = database.user.destroy({ where: { id: 3 } });

  return result;
}
async function list() {
  const result = await commonMysqlService.list(database.user);
  return result;
}
async function remove({ id }) {
  const result = await commonMysqlService.remove(database.user, id);
  return result;
}

async function getById({ id }) {
  const result = await commonMysqlService.get(database.user, id);
  return result;
}

async function update(id, body) {
  const result = await commonMysqlService.update(database.user, body, id);
  return result;
}

async function findByUsername(username) {
  const result = await commonMysqlService.checkDuplicate(database.user, {
    username,
  });
  return result;
}
export default {
  userLogin,
  create,
  remove,
  list,
  getById,
  update,
  findByUsername,
};
