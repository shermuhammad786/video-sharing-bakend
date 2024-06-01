import Comments from "../Models/Comments.js";
import Video from "../Models/Video.js";
import { createError } from "../error.js";

export const addComment = async (req, res, next) => {
    const newComment = new Comments({ ...req.body, userId: req.user.id })
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment)
    } catch (error) {
        next(error)
    }
}
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comments.findById(req.params.id)
        const video = await Video.findById(req.params.id)
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            res.status(200).send("The Comment has been deleted.")
        } else {
            next(createError(403, "You can only delete your comment"))
        }
    } catch (error) {
        next(error)
    }
}
export const getComments = async (req, res, next) => {
    try {
        const allComments = await Comments.find({ videoId: req.params.videoId });
        res.status(200).json(allComments)
    } catch (err) {
        next(err)
    }
}