import { request } from "../utils/arqPlataformAxios";

export const login = async (email,password) => {
	return await request({
		url: '/api/v1/auth/login',
		method: 'POST',
		data: { email, password }
	});
}

export const register = async (name, lastname, email, password) => {
	return await request({
		url: "/api/v1/auth/register",
		method: "POST",
		data: { name, lastname, email, password }
	});
}

export const isCheckTokenService = async (token) => {
	return await request({
		url: '/api/v1/auth/renew',
		method: 'GET',
		data: { token }
	});
}

export const verifySSO = async (body) => {
	const res = await request({
		url: "/api/v1/auth/verifySSO",
		method: "POST",
		data: body
	});

	if (!res.data.success) {
		throw new Error(res.data.message);
	}

	console.log("El usuario tiene una sesión activa (SSO)")

	return {
		user: res.data.user,
		data: res.data.data
	}
}

export const loginSSO = async (body) => {
	const res = await request({
		url: "/api/v1/auth/loginSSO",
		method: "POST",
		data: body
	});

	console.log("loginSSO response:", res);

	if (res.data.success) {
		return console.log("El usuario se logeo correctamente (SSO)")
	} else {
		console.log(res.data.message);
	}


	// return {
	// 	user: res.data.user,
	// 	data: res.data.data
	// }

}

export const logoutSSO = (body) => {
	return request({
		url: "/api/v1/auth/logoutSSO",
		method: "POST",
		data: body
	});
}
