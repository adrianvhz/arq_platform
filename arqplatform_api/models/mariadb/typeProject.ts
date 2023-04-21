import { DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import mariaDB from './../../config/dbMariaDb';
import { ZonesI } from '../../interfaces/zones';

export interface UserIpunt extends Optional<ZonesI, 'id'> {}
export interface UserOuput extends Optional<ZonesI, 'id'> {}

class TypeProject extends Model<
	InferAttributes<TypeProject>,
	InferCreationAttributes<TypeProject>
> {
	declare id: number;
	declare name: string;
	declare company_id: number;
	declare icon: string;
	declare show: boolean;
	declare slug: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}

TypeProject.init(
{
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	company_id: {
		type: DataTypes.INTEGER.UNSIGNED,
		defaultValue: 0
	},
	icon: {
		type: DataTypes.STRING
	},
	show: {
		type: DataTypes.BOOLEAN,
		defaultValue: true
	},
	slug: {
		type: DataTypes.STRING
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "types_projects",
	paranoid: true,
	underscored: true
});

export default TypeProject;
