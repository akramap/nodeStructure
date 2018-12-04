import path from "path";
let a = "ram";
module.exports = {
  config: path.resolve("app", "config", `${process.env.NODE_ENV}.json`),
  "migrations-path": path.resolve("app", "database", "migrations"),
  "models-path": path.resolve("app", "database"),
  "seeders-path": path.resolve("app", "database", "seeders"),
};
