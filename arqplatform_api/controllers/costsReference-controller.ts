import FormData from "form-data";
import CostsReference from '../models/mariadb/costsReference';
import { request } from "../utils/request";
import type { Request, Response } from "express";

export const getCosts = async (req: Request, res: Response) => {
	const costs = await CostsReference.findAll();
	
	res.json({
		statusCode: 200,
		costs
	});
}

export const updateCosts = async (req: Request, res: Response) => {
	const form = new FormData();
	form.append("file", req.file.buffer, "x");
	form.append("data", "a");

	const x = request(process.env.HELPER_API + "/admin/readCostosDeObra", {
		method: "POST",
		headers: {
			"Content-Type": `multipart/form-data; boundary=${form.getBoundary()}`
		}
	}, (im) => {
		// res.setEncoding("utf8");

		let body = "";
		
		im.on("data", (chunk) => {
			body += chunk;
		});

		im.on("end", () => {
			const costs = JSON.parse(body);

			CostsReference.bulkCreate(costs.map((el: any) => ({
				categoria: el[0],
				muros_y_columnas: el[1],
				techos: el[2],
				pisos: el[3],
				puertas_y_ventanas: el[4],
				revestimientos: el[5],
				banos: el[6],
				instalaciones: el[7]
			})),
			{
				updateOnDuplicate: [
					"muros_y_columnas",
					"techos",
					"pisos",
					"puertas_y_ventanas",
					"revestimientos",
					"banos",
					"instalaciones"
				]
			});

			res
				.status(200)
				.json({
					statusCode: 200,
					body
				})
		})
	});
	
	form.pipe(x);
}
