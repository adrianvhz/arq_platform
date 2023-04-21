export interface UserI  {
	id?: number;
	id_master: number;
	name: string;
	lastname: string;
	email: string;
	password?: string;
	image?: string;
	sex?: string;
	profile_id?: number; 
	createdAt?: Date; 
	updatedAt?: Date;
	deleted_at?: Date;
}
