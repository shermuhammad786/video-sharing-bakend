import { createError } from "../error.js"
import Users from "../Models/Users.js"
import Video from "../Models/Video.js";
import { verifyToken } from "../utils/verifyToken.js"


export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }
            );
            res.status(200).json({
                status: true,
                message: "user updated Successfully",
                updatedUser: updatedUser
            })
        } catch (error) {

        }
    } else {
        return next(createError(403, "You can update only your account"))
    }
}
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const deletedUser = await Users.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status: true,
                message: "user deleted Successfully",
                deletedUser: deletedUser
            })
        } catch (error) {

        }
    } else {
        return next(createError(403, "You can update only your account"))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}
export const subscribe = async (req, res, next) => {
    try {
        await Users.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        })
        await Users.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json({
            status: true,
            message: "Subscription Scuueccfull."
        })
    } catch (err) {
        next(err)
    }
}
export const unsubscribe = async (req, res, next) => {

    try {
        await Users.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })
        await Users.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json({
            status: true,
            message: "Unsubscription Scuueccfull."
        })
    } catch (err) {
        next(err)
    }
}
export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {

        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { disLikes: id }
        })
        res.status(200).send("The video has been liked")
    } catch (err) {
        next(err)
    }
}
export const dislike = async (req, res, next) => {

    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { disLikes: id },
            $pull: { likes: id }
        })
        res.status(200).send("The video has been dis liked")
    } catch (err) {
        next(err)
    }
}
