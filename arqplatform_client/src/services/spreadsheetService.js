import axios from "axios";

export const readMatrizExcel = (file, data) => {
	let form = new FormData();
	form.append("file", file);
	form.append("data", data);

	return axios.post(import.meta.env.VITE_READ_EXCEL + "/admin/readMatriz", form, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})
}
