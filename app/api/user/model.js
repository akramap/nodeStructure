export default (queryInterface, Sequelize) =>
  queryInterface.define(
    "user",
    {
      name: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
    },
    { freezeTableName: true },
  );
