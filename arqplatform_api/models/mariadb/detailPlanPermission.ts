import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from "sequelize";
import mariaDB from "./../../config/dbMariaDb";
import Planes from "./plan";
import Permiso from "./permiso";

class DetailPlanPermission extends Model<
	InferAttributes<DetailPlanPermission>,
	InferCreationAttributes<DetailPlanPermission>
> {
	declare id: number;
	declare idplan: number;
	declare idpermiso: number;
	declare estado: number;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

DetailPlanPermission.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	idplan: {
		type: DataTypes.INTEGER.UNSIGNED, 
		allowNull: false,
		references: {
			model: Planes,
			key: "id"
		}
	},
	idpermiso: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false,
		references: {
			model: Permiso,
			key: "id"
		}
	},
	estado: {
		type: DataTypes.INTEGER.UNSIGNED,
		allowNull: false
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "detailplanpermission",
	paranoid: true,
	underscored: true,
	indexes: [{
		unique: true,
		fields: ["idplan", "idpermiso"]
	}]
});

Planes.belongsToMany(Permiso, { through: DetailPlanPermission, foreignKey: "idplan" });
Permiso.belongsToMany(Planes, { through: DetailPlanPermission, foreignKey: "idpermiso" });

// Planes.belongsToMany(Permiso,{ through: "detailplanpermission", foreignKey: "idplan" })
// Permiso.belongsToMany(Planes,{ through: "detailplanpermission", foreignKey: "idpermiso" })
// DetailPlanPermission.removeAttribute("id");

export default DetailPlanPermission;
