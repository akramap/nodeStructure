export default (queryInterface, Sequelize) => {
  const User = queryInterface.define(
    "user",
    {
      name: { type: Sequelize.STRING },
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      isAdmin: { type: Sequelize.INTEGER },
      isUser: { type: Sequelize.INTEGER },
    },
    { freezeTableName: true },
  );
  User.associate = models => {
    User.hasOne(models.roles, {
      foreignKey: { allowNull: true },
    });
  };
  return User;
};
