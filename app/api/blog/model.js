// import db from "../../../config/mysql";

export default (queryInterface, Sequelize) => {
  return queryInterface.define(
    "post",
    {
      userId: { type: Sequelize.INTEGER },
      text: { type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      video: { type: Sequelize.INTEGER },
    },
    { freezeTableName: true },
  );
};
