export default (sequelize, DataTypes) => {
  const Attachments = sequelize.define(
    "Attachments",
    {
      images: DataTypes.STRING,
      videos: DataTypes.STRING,
    },
    {},
  );
  // Attachments.associate = function(models) {
  //   // associations can be defined here
  // };
  return Attachments;
};
