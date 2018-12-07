import jwt from "jsonwebtoken";
/* // import CryptoJS from "crypto-js";
 import { SHA512 } from "crypto-js"; */

// import nodejs crypto module.
import crypto from "crypto";
import response from "../../../localization/en";
// import models list from database/index.
import database from "../../database/index";
// import database configurations from config/development.json.
import config from "../../../config/development";
// import common service module.
import commonMysqlService from "../../helpers/services/commonMysqlService";

async function userLogin(params) {
  // create msg object consisting response messages.
  const msg = {
    succes: response.SUCCESS,
    NOT_AUTHORIZED: response.NOT_AUTHORIZED,
    DOES_NOT_EXIST: response.DOES_NOT_EXIST,
  };
  const { username } = params;
  // get users list by id.
  const userObj = await database.user.findOne({ where: { username } });

  // check if user exist.
  if (userObj) {
    // decrypt password.
    const actualPassword = await decryptPassword(userObj.password);
    // matching existing password with the input password.
    if (params.password === actualPassword) {
      // creating object for creation of jwt token.
      const payload = {
        userObj,
      };

      // generating jwt token.
      const token = jwt.sign(payload, config.jwt.secret, {
        expiresIn: 1440, // expires in 24 hours
      });

      // return the suucess result to controller.
      return { message: msg.succes, token };
    }
    // return the result to controller.
    return { message: msg.NOT_AUTHORIZED };
  }
  // return the result to controller.
  return { message: msg.DOES_NOT_EXIST };
}
/**
 * create new user (user sign up )
 * @property {string} params.name - The name of user.
 * @property {string} params.username - The username of the user.
 * @property {string} params.password - The password of the user.
 */
async function create(body) {
  // calling common create service for user signup.
  const result = await commonMysqlService.create(database.user, body);
  // return the result to controller.
  return result;
}

/**
 * Get Users List
 * @returns {Object}
 */
async function list() {
  // calling common list service to get the Users list.
  const result = await commonMysqlService.list(database.user);

  // return the result to controller.
  return result;
}

/**
 * Delete User
 * @property {integer} id - User Id.
 * @returns {Object}
 */
async function remove({ id }) {
  // calling common remove service to delete the User by id.
  const result = await commonMysqlService.remove(database.user, id);

  // return the result to controller.
  return result;
}

/**
 *  get User By Id
 * @property {integer} params.id - User Id.
 * @returns {Object}
 */
async function findById({ id }) {
  // calling common findById service to get the Users by id.
  const result = await commonMysqlService.findById(database.user, id);

  // return the result to controller.
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
async function update(id, body) {
  // calling common update service to update the User to existing record.
  const result = await commonMysqlService.update(database.user, body, id);

  // return the result to controller.
  return result;
}
/**
 * find by username.
 * @property {string} username
 */
async function findByUsername(username) {
  // checking for duplicate user.
  const result = await commonMysqlService.checkDuplicate(database.user, {
    username,
  });
  // return the result to controller.
  return result;
}

/**
 * encrpyt the password.
 * @property {string} password- password of the user.
 */
async function encryptPassword({ password }) {
  /* // encrypt user password using SHA512(crypto-js).
  const hash = SHA512(password).toString(); */

  // encrypt user password using crypto.
  const algorithm = "aes-256-ctr";
  const secret = "d6F3Efeq";
  const cipher = crypto.createCipher(algorithm, secret);
  let crypted = cipher.update(password, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

async function decryptPassword(password) {
  const algorithm = "aes-256-ctr";
  const secret = "d6F3Efeq";
  const decipher = crypto.createDecipher(algorithm, secret);
  let dec = decipher.update(password, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

export default {
  userLogin,
  create,
  remove,
  list,
  findById,
  update,
  findByUsername,
  encryptPassword,
  decryptPassword,
};
