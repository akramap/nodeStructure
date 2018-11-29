// import db from "../../../config/mysql";
export default (queryInterface, Sequelize) => {
  return queryInterface.define(
    "comment",
    {
      userId: { type: Sequelize.INTEGER },
      postId: { type: Sequelize.INTEGER },
      comment: { type: Sequelize.STRING },
    },
    { freezeTableName: true },
  );
};
