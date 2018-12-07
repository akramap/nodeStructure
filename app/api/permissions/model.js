export default (queryInterface, Sequelize) => {
  const permission = queryInterface.define(
    "permissions",
    {
      roleId: { type: Sequelize.INTEGER },
      permission: { type: Sequelize.JSON },
    },
    { freezeTableName: true },
  );
  permission.associate = models => {
    permission.belongsTo(models.roles, {
      foreignKey: "roleId",
      onDelete: "CASCADE",
    });
    permission.belongsTo(models.user, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return permission;
};
