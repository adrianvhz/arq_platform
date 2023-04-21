import { request } from "./request";
import jwt from "jsonwebtoken"

export async function checkAuthMaster(action: AuthAction, body: any) {
	return new Promise((resolve, reject) => {
		const cr = request(process.env.MASTER_AUTH_WS + (action === "register" ? "/user/registerUserExternal" : "/auth/login"), {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer " + jwt.sign({ key: "AH3iH16PXS2" }, process.env.TOKEN_KEY) 
				// "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzcwNjM0MDAsImlhdCI6MTY1NDA1MjgwMCwia2V5IjoiQUgzaUgxNlBYUzIifQ.9y631o_6Ejl9jMDAJcg2bLpWgoNAw6W89koYPxc9jD4" 
			}
		}, (res) => {
			var completeData = "";
		
			res.setEncoding("utf8");

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

		let params = [];
		for (let key of Object.keys(body)) {
			params.push(key + "=" + body[key]);
		}
		cr.end(params.join("&"));
	});
}


type AuthAction = "register" | "login"
