import express from "express";
import { isAdmin, isAuth } from "../middleware/isAuth.js";
import { addLecture, createCourse, deletCourse, deleteLecture, getAllStats } from "../controller/admin.js";
import { uploadFiles } from "../middleware/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/courses/:id", isAuth, isAdmin, uploadFiles, addLecture);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);
router.delete("/courses/:id", isAuth, isAdmin, deletCourse);

router.get("/stats", isAuth, isAuth, getAllStats);
export default router;
