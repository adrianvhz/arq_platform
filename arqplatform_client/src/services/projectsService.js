import { request } from "../utils/arqPlataformAxios"

export const getAllProjects = () => {
	return request({
		method: "GET",
		url: "/api/v1/projects"
	});
}

export const createProjectService = (body) => {
	return request({
		method: "POST",
		url: "/api/v1/projects",
		data: body
	});
}

export const updateProjectService = (id, body) => {
	return request({
		method: "PUT",
		url: `/api/v1/projects/${id}`,
		data: body
	});
}

export const deleteProjectService = (id, parentID) => {
	return request({
		method: "DELETE",
		url: `/api/v1/projects/${id}`,
		data: { parentID }
	});
}

export const getProjectByID = (id) => {
	return request({
		method: "GET",
		url: `/api/v1/projects/id/${id}`
	});
}

export const getProjectsByUserID = (id, slug) => {
	return request({
		url: `/api/v1/projects/${id}`,
		method: "GET",
		params: {
			"type_project": slug
		}
	});
}

export const getTypeProjects = () => {
	return request({
		method: "GET",
		url: "/api/v1/typeProject"
	});
}

export const getProjectsCosts = (id) => {
	return request({
		method: "GET",
		url: `/api/v1/projects/costs/${id}`
	})
}

export const updateProjectCostsByIDService = (id, body) => {
	return request({
		method: "PUT",
		url: `/api/v1/projects/costs/${id}`,
		data: body
	})
}

export const createThumbnailService = (id, body) => {
	return request({
		method: "POST",
		url: `/api/v1/projects/thumbnail/${id}`,
		headers: {
			"Content-Type": "multipart/form-data"
		},
		data: body
	});
}

export const updateCostsReference = (file) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("data", "a");

	return request({
		method: "PUT",
		url: "/api/v1/admin/costsReference",
		headers: {
			"Content-Type": "multipart/form-data"
		},
		data: formData
	})
}
