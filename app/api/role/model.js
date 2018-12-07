export default (queryInterface, Sequelize) => {
  const role = queryInterface.define(
    "roles",
    {
      role: { type: Sequelize.STRING },
      userId: { type: Sequelize.INTEGER },
    },
    { freezeTableName: true },
  );
  role.associate = models => {
    role.belongsTo(models.user, {
      foreignKey: { allowNull: true },
      onDelete: "CASCADE",
    });
    role.hasMany(models.permissions, {
      foreignKey: "roleId",
      as: "permissions",
    });
  };
  return role;
};
