import { DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import mariaDB from './../../config/dbMariaDb';
import { ZonesI } from '../../interfaces/zones';

export interface UserIpunt extends Optional<ZonesI, 'id'> {}
export interface UserOuput extends Optional<ZonesI, 'id'> {}

class Zones extends Model<
	InferAttributes<Zones>,
	InferCreationAttributes<Zones>
> {
	declare id: number;
	declare name: string;
	declare company_id: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

Zones.init({
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
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "zones",
	underscored: true,
	paranoid: true
});

export default Zones;
