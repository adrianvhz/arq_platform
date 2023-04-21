import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const arqPlataformAxios = axios.create({
	baseURL: BASE_URL
});

/**
 * 
 * @param {import("axios").AxiosRequestConfig } param0 
 * @returns 
 */
export const request = async ({ ...options }) => {
	//   arqPlataformAxios.defaults.headers.common.Authorization 
	//   = `Bearer ${localStorage.getItem(
	//     "token"
	//   )}`;

	arqPlataformAxios.interceptors.request.use(config => {
		config.headers = {
			...config.headers,
			'x-token':`${localStorage.getItem("token")}`
		}
		return config;
	});

	const onSuccess = (response) => response;
	const onError = (error) => {
		error.error = true;
		return error;
	}

	try {
		const response = await arqPlataformAxios(options);
		return onSuccess(response);
	} catch (error) {
		return onError(error);
	}
}
