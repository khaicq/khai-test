import { Dialect, Sequelize } from "sequelize";
import { environment } from "../environments/environment";

const sequelize = new Sequelize(
  environment.sqlDB.name,
  environment.sqlDB.username,
  environment.sqlDB.password,
  {
    host: environment.sqlDB.host,
    port: environment.sqlDB.port,
    dialect: environment.sqlDB.dialect as Dialect,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      paranoid: false,
    },
  }
);

export default sequelize;
