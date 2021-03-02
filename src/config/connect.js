import Sequelize from "sequelize";
import "dotenv/config";

const config = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.DBPORT,
  DB: process.env.DB,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  operatorsAliases: false,
  dialectOptions: {
    useUTC: false // for reading from database
  },
  timezone: "-05:00" // for writing to database
});

/*sequelize.sync({ force: false }).then(() => {
console.log("tablas sincronizadas");
});*/

export const test = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    console.error("----------------------", error);
  }
};
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
export default db;
