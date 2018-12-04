export default (queryInterface, Sequelize) =>
  queryInterface.define(
    "posts",
    {
      userId: { type: Sequelize.INTEGER },
      content: { type: Sequelize.STRING },
    },
    { freezeTableName: true },
  );
