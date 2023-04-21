import jwt from "jsonwebtoken";

export const generateJWT = (id: number, secretkey: string) => {
	return new Promise((resolve, reject) => {
		const payload = { id }

		jwt.sign(payload, secretkey, {
			expiresIn : "5h"
		},
		(err, token) => {
			if (err) {
				console.log(err);
				reject('Error al generar JWT');
			} else {
				resolve(token);
			}
		})
	})
}
