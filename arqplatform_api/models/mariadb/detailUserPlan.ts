import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
  } from "sequelize";
  import mariaDB from "../../config/dbMariaDb";
  import Planes from "./plan";
  import User from "./user";
 
// when creating an instance of the model (such as using Model.create()).
class DetailUserPlan extends Model<
	InferAttributes<DetailUserPlan>,
	InferCreationAttributes<DetailUserPlan>
> {
	declare id: number;
	declare iduser: number;
	declare idplan: number;
	declare estado: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

DetailUserPlan.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	iduser: { 
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		references: {
			model: User,
			key: "id"
		}
	},
	idplan: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		references: {
			model: Planes,
			key: "id"
		}
	},
	estado: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "detailuserplan",
	paranoid: true,
	underscored: true,
	indexes: [
		{
			unique: true,
			fields: ["iduser", "idplan"]
		}
	]
});
  
Planes.belongsToMany(User, { through: DetailUserPlan, foreignKey: "idplan" });
User.belongsToMany(Planes, { through: DetailUserPlan, foreignKey: "iduser" });

// DetailUserPlan.removeAttribute("id");

export default DetailUserPlan;
