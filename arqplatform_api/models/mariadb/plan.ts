import { DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import  mariaDB  from './../../config/dbMariaDb';
import { PlanesI  } from '../../interfaces/plan';

export interface UserIpunt extends Optional<PlanesI, 'id'> {}
export interface UserOuput extends Optional<PlanesI, 'id'> {}

class Planes extends Model <
	InferAttributes<Planes>,
	InferCreationAttributes<Planes>
> {
	declare id: number;
	declare descripcion: string;
	declare vigencia: number;
	declare precio: number;
	declare defecto: number;
	declare estado: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

Planes.init({
	id: { 
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	descripcion: {
		type: DataTypes.STRING,
		allowNull: false
	},
	vigencia: {
		type: DataTypes.INTEGER, allowNull: false
	},
	precio: {
		type: DataTypes.INTEGER, allowNull: false
	},
	defecto: {
		type: DataTypes.INTEGER, allowNull: false
	},
	estado: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: 'planes',
	paranoid: true,
	underscored: true
});

export default Planes;
