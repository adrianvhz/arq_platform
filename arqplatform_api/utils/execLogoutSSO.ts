import { UserI } from "../interfaces";
import { request } from "./request";

export function execLogoutSSO(body: any): Promise<Response> {
	return new Promise((resolve, reject) => {
		const cr = request(process.env.AUTH_SSO + "/api/v1/users/signout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiJnRW53Y1N1RVVITnV4Z0pIIiwiZXgiOiIxMjQ0NTY3ODkwIn0.VP5eQmNZW3s8uddcBU-jNLk1sW7NxCWHhrIWk63Tlvg" 
			}
		}, (res) => {
			res.setEncoding("utf8");
			
			var completeData = "";

			res.on("data", (chuck) => {
				completeData += chuck;
			});
	
			res.on("end", () => {
				resolve(JSON.parse(completeData));
			});
		});

		cr.on("error", (err) => {
			reject(err);
		})

		cr.end(JSON.stringify(body));
	});
}

interface Response {
	success: boolean;
	data: {
		user: UserI;
	};
	message: string;
}
