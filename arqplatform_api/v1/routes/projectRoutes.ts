import { Router } from 'express';
import {
	getAllProjects,
	createProject,
	deleteProject,
	putProject,
	getProjectsByUserID,
	getProjectByID,
	test,
	createThumbnail,
	getProjectsCosts,
	updateProjectCosts
} from "../../controllers/projectController";
import multer from "multer";
import fs from "fs";
import path from "path";
import projectErrorHandler from '../../middlewares/project-errorHandler';
import type { Request, Response, NextFunction } from "express";

const errPipe = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // catch(next);
}

const storage = multer.diskStorage({
	filename(req, file, callback) {
		// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		// callback(null, req.params.id + "-" + uniqueSuffix);
		callback(null, "thumbnail-" + req.params.id + ".png")
	},
	destination: "uploads/"
});
const upload = multer({ storage: storage });

const router = Router();

router.get('/', errPipe(getAllProjects));
router.post('/', errPipe(createProject));
router.put('/:id', errPipe(putProject));
router.delete('/:id', errPipe(deleteProject));
router.get('/:id', errPipe(getProjectsByUserID));
router.get("/id/:id", errPipe(getProjectByID));
router.get("/test/dataRet", errPipe(test));
router.post("/thumbnail/:id", upload.single("thumbnail"), errPipe(createThumbnail));
router.get("/thumbnail/:id", (req, res) => {
	const filePath = path.resolve(__dirname, "..", "..", "uploads", `thumbnail-${req.params.id}.png`);
	console.log(filePath);
	res.writeHead(200, {
		// "Content-Length": 5813,
		"Content-Type": "image/png"
	});
	const x = fs.createReadStream(filePath);
	x.on("error", (err) => {
		res.end("error")
	});
	x.pipe(res);
})
router.get("/costs/:id", errPipe(getProjectsCosts));
router.put("/costs/:id", errPipe(updateProjectCosts));

/* error handler */
router.use(projectErrorHandler);

export default router;
