import { request } from "../utils/arqPlataformAxios";

export const geolocationService = async () => {
	const res = await request({
		method: "GET",
		url: "/api/v1/geolocation"
	});

	return res.data;
}