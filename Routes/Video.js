import express from "express"
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../Controllers/Video.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE VIDEO
router.post("/add/video", verifyToken, addVideo)

//UPDATE VIDEO
router.put("/:id", verifyToken, updateVideo)

//DELETE VIDEO
router.delete("/:id", verifyToken, deleteVideo)

// GET A VIDEO
router.get("/find/:id", getVideo)

//ADD VIEWS ON VIDEO
router.put("/find/:id", addView)

// TREND VIDEOS
router.get("/trend", trend)

//RANDOM VIDEOS
router.get("/random", random)

//GET SUBSCRIBES VIDEOS
router.get("/sub", verifyToken, sub)

//GET TAGS VIDEOS
router.get("/tags", getByTag)

//GET SEACHED VIDEOS
router.get("/search", search)


export default router