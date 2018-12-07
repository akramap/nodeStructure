import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../../config/development";
// import Users from "./Users/user";
const ROOT_DIR = path.dirname(require.main.filename);
const APP_DIR = `${ROOT_DIR}/app`;

const db = {};

let sequelize = null;
const { Op } = Sequelize;
const operatorsAliases = {
  $gt: Op.gt,
  $gte: Op.gte,
  $ne: Op.ne,
  $in: Op.in,
  $or: Op.or,
  $and: Op.and,
  $like: Op.like,
};

if (config.useEnvVariable) {
  sequelize = new Sequelize(process.env[config.env], config);
} else {
  const databaseConf = config.mysql;
  sequelize = new Sequelize(
    databaseConf.dbname,
    databaseConf.username,
    databaseConf.password,
    {
      host: databaseConf.host,
      dialect: databaseConf.dialect,
      operatorsAliases,
    },
  );
}

const files = [];
const sortDir = mainDir => {
  const folders = [];
  const CheckFile = filePath => fs.statSync(filePath).isFile();
  const sortPath = dir => {
    fs
      .readdirSync(dir)
      // .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
      .forEach(res => {
        const filePath = path.join(dir, res);
        if (CheckFile(filePath)) {
          if (filePath.indexOf("model.js") !== -1) {
            files.push(filePath);
          }
        } else {
          folders.push(filePath);
        }
      });
  };
  folders.push(mainDir);
  let i = 0;
  do {
    sortPath(folders[i]);
    i += 1;
  } while (i < folders.length);
};
sortDir(APP_DIR);

files.forEach(file => {
  const model = sequelize.import(file);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
