export default (queryInterface, Sequelize) =>
  queryInterface.define(
    "comment",
    {
      userId: { type: Sequelize.INTEGER },
      postId: { type: Sequelize.INTEGER },
      comment: { type: Sequelize.TEXT },
      commentId: { type: Sequelize.INTEGER },
      status: { type: Sequelize.STRING },
    },
    { freezeTableName: true },
  );
