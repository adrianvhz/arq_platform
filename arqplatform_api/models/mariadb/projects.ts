import { DataTypes, Model, InferAttributes, InferCreationAttributes, HasOneGetAssociationMixin, HasOneCreateAssociationMixin, HasOneSetAssociationMixin } from "sequelize";
import mariaDB from "./../../config/dbMariaDb";
import ProjectCategory from "./projectCategory";

class Project extends Model<
	InferAttributes<Project>,
	InferCreationAttributes<Project>
> {
	declare id: number;
	declare name: string;
	declare code: string;
	declare thumbnail: string;
	declare capacity: number;
	declare client: string;
	declare ubication: string;
	declare manager: string;
	declare parent_id: number;
	declare student: string;
	declare zone: string;
	declare level: string;
	declare sublevel: string;
	declare public: string;
	declare room: number;
	declare height: number;
	declare width: number;
	declare user_id: number;
	declare type_id: number;
	declare company_id: number;
	declare coordenadas: string;
	declare tipologia: string;
	declare distrito: string;
	declare puntos: string;
	declare ambientes: string;
	declare aforo: string;
	declare build_data: string;
	declare toilets_per_student: string;
	declare stairs: string;
	declare createdAt: Date;
	declare updatedAt: Date;

	declare getProjectCategory: HasOneGetAssociationMixin<ProjectCategory>;
	declare createProjectCategory: HasOneCreateAssociationMixin<ProjectCategory>;
	declare setProjectCategory: HasOneSetAssociationMixin<ProjectCategory, "ProjectCategoryId">;

	// declare projectCategory
}

Project.init({ // @ts-ignore
	id: {
		type: new DataTypes.INTEGER({ unsigned: true, length: 11 }),
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
	},
	code: {
		type: DataTypes.STRING,
	},
	thumbnail: {
		type: DataTypes.STRING
	},
	capacity: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	client: {
		type: DataTypes.STRING,
	},
	ubication: {
		type: DataTypes.STRING,
	},
	manager: {
		type: DataTypes.STRING,
	},
	parent_id: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	student: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	zone: {
		type: DataTypes.STRING,
	},
	level: {
		type: DataTypes.STRING,
	},
	sublevel: {
		type: DataTypes.STRING,
	},
	public: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	room: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	height: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	width: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	user_id: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	type_id: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	company_id: {
		type: new DataTypes.INTEGER({ length: 11 })
	},
	coordenadas: {
		type: DataTypes.STRING
	},
	tipologia: {
		type: DataTypes.STRING
	},
	distrito: {
		type: DataTypes.STRING
	},
	puntos: {
		type: DataTypes.TEXT
	},
	ambientes: {
		type: DataTypes.TEXT
	},
	aforo: {
		type: DataTypes.TEXT
	},
	build_data: {
		type: DataTypes.TEXT
	},
	toilets_per_student: {
		type: DataTypes.TEXT
	},
	stairs: {
		type: DataTypes.TEXT
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE
},
{
	sequelize: mariaDB,
	tableName: "projects",
	paranoid: true,
	underscored: true
});

ProjectCategory.hasOne(Project);
Project.belongsTo(ProjectCategory);

export default Project;
