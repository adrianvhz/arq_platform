import { Sequelize, Options } from "sequelize";

const dbname: string = process.env.DB_NAME || '';
const username: string = process.env.DB_USER || '';
const password: string = process.env.DB_PASS || '';
const options: Options = {
	host: process.env.DB_HOST || '',
	dialect: "mariadb",
	port: parseInt(process.env.DB_PORT || '3308', 10),
	logging: false
};

const mariaDB = new Sequelize(dbname, username, password, options);

export default mariaDB;
