import db from "../../../config/mysql";
// const db = require("../app/config/mysql");
export default (queryInterface, Sequelize) => {
  return queryInterface.define(
    "user",
    {
      name: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
    },
    { freezeTableName: true },
  );
};
