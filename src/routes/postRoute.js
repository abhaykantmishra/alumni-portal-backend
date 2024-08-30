import { Router } from "express";
import { getJobs, postJob,getUserPosts } from "../controllers/postController.js";
import {upload} from "../middleware/multer.middleware.js";

const postRouter = Router();

postRouter.route('/postjob').post(upload.single('thumbnail'),postJob);
postRouter.route("/getjobs").get(getJobs);
postRouter.route('/getuserposts').post(getUserPosts);

export  {postRouter};