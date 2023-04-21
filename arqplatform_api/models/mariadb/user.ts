import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	Optional
} from "sequelize";
import mariaDB from "./../../config/dbMariaDb";
import { UserI } from "../../interfaces/user";

export interface UserIpunt extends Optional<UserI, 'id'> {}
export interface UserOuput extends Optional<UserI, 'id'> {}

class User extends Model <
	InferAttributes<User>,
	InferCreationAttributes<User>
> {
	declare id: number;
	declare id_master: number;
	declare name: string;
	declare lastname: string;
	declare email: string;
	declare password: string;
	declare image: string;
	declare sex: string;
	declare profile_id: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

User.init({
	id: { // @ts-ignore 
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	id_master: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false 
	},
	image: {
		type: DataTypes.STRING
	},
	sex: {
		type: new DataTypes.CHAR({ length: 1 }),
		defaultValue: "M"
	},
	profile_id: {
		type: DataTypes.INTEGER.UNSIGNED,
		defaultValue: 3
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "users",
	paranoid: true,
	underscored: true
});

User.prototype.toJSON = function() {
	const user: UserI = Object.assign({}, this.get());
	delete user.password;
	return user;
}

export default User;
