import { DataTypes, Model, InferAttributes, InferCreationAttributes, Optional } from "sequelize";
import mariaDB from "./../../config/dbMariaDb";

type CostsReferenceAtrributes = {
	categoria: string;
	muros_y_columnas: number;
	techos: number;
	pisos: number;
	puertas_y_ventanas: number;
	revestimientos: number;
	banos: number;
	instalaciones: number;
	createdAt: Date;
	updatedAt: Date;
}
type CostsReferenceCreationAtrributes = CostsReferenceAtrributes;

class CostsReference extends Model <
	CostsReferenceAtrributes,
	CostsReferenceCreationAtrributes
> {
	declare categoria: string;
	declare muros_y_columnas: number;
	declare techos: number;
	declare pisos: number;
	declare puertas_y_ventanas: number;
	declare revestimientos: number;
	declare banos: number;
	declare instalaciones: number;
	declare createdAt: Date;
	declare updatedAt: Date;
}

CostsReference.init({
	categoria: { 
		type: DataTypes.CHAR(1),
		primaryKey: true,
		allowNull: false
	},
	muros_y_columnas: {
		type: DataTypes.FLOAT(11)
	},
	techos: {
		type: DataTypes.FLOAT(11)
	},
	pisos: {
		type: DataTypes.FLOAT(11)
	},
	puertas_y_ventanas: {
		type: DataTypes.FLOAT(11)
	},
	revestimientos: {
		type: DataTypes.FLOAT(11)
	},
	banos: {
		type: DataTypes.FLOAT(11)
	},
	instalaciones: {
		type: DataTypes.FLOAT(11)
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "costs_reference",
	paranoid: true,
	underscored: true
});

export default CostsReference;
