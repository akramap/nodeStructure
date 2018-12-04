// import Sequelize from "sequelize";
// import UserModel from "../app/api/user/model";
// import PostModel from "../app/api/posts/model";
// import CommentModel from "../app/api/comments/model";
// import mysqlConfig from "../config/development";

// const db = {};

// const sequelize = new Sequelize(
//   mysqlConfig.mysql.dbname,
//   mysqlConfig.mysql.username,
//   mysqlConfig.mysql.password,
//   {
//     dialect: mysqlConfig.mysql.dialect,
//     host: mysqlConfig.mysql.host,
//     port: mysqlConfig.mysql.port,
//     logging: false,
//   },
// );

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// db.User = UserModel(sequelize, Sequelize);
// db.Post = PostModel(sequelize, Sequelize);
// db.Comment = CommentModel(sequelize, Sequelize);
// sequelize.sync();

// // db.User.sync().then(result => {});

// // console.log("db.sequelize", db.sequelize);
// module.exports = db;
