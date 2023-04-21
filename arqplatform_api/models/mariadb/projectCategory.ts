import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import mariaDB from "./../../config/dbMariaDb";

type ProjectCategoryAtrributes = {
	id: number;
	user_id: number;
	project_id: number;
	project_parent_id: number;
	muros_y_columnas: string;
	techos: string;
	puertas_y_ventanas: string;
	revestimientos: string;
	banos: string;
	instalaciones: string;
	createdAt: Date;
	updatedAt: Date;
}
type ProjectCategoryCreationAtrributes = ProjectCategoryAtrributes;

class ProjectCategory extends Model <
	ProjectCategoryAtrributes,
	ProjectCategoryCreationAtrributes
> {
	declare id: number;
	declare user_id: number;
	declare project_id: number;
	declare project_parent_id: number;
	declare muros_y_columnas: string;
	declare techos: string;
	declare puertas_y_ventanas: string;
	declare revestimientos: string;
	declare banos: string;
	declare instalaciones: string;
	declare createdAt: Date;
	declare updatedAt: Date;
}

ProjectCategory.init({
	id: { 
		type: new DataTypes.INTEGER({ unsigned: true, length: 11 }),
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	user_id: {
		type: new DataTypes.INTEGER({ unsigned: true, length: 11 })
	},
	project_id: {
		type: new DataTypes.INTEGER({ unsigned: true, length: 11 })
	},
	project_parent_id: {
		type: new DataTypes.INTEGER({ unsigned: true, length: 11 })
	},
	muros_y_columnas: {
		type: DataTypes.CHAR(1)
	},
	techos: {
		type: DataTypes.CHAR(1)
	},
	puertas_y_ventanas: {
		type: DataTypes.CHAR(1)
	},
	revestimientos: {
		type: DataTypes.CHAR(1)
	},
	banos: {
		type: DataTypes.CHAR(1)
	},
	instalaciones: {
		type: DataTypes.CHAR(1)
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "project_category",
	paranoid: true,
	underscored: true
});

export default ProjectCategory;
