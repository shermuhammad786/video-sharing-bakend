import Users from "../Models/Users.js";
import Video from "../Models/Video.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken"

//CREATE VIDEO
export const addVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body })

    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo)
    } catch (error) {
        next(error)
    };
}

//UPDATE VIDEO
export const updateVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return cext(createError(404, "video not found"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id,
                {
                    $set: re.body,
                }, { new: true }
            )

            res.status(200).json(updatedVideo);
        }
    } catch (error) {
        next(403, "you can update only your video")
    };

}

//DELETE VIDEO
export const deleteVideo = async (req, res, next) => {

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return cext(createError(404, "video not found"));
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id)

            res.status(200).json("video has been deleted");
        }
    } catch (error) {
        next(403, "you can delete only your video")
    };

}

//GET A VIDEO
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video)
    } catch (error) {
        next(errro)
    };
}

//ADD VIEW A VIDEO
export const addView = async (req, res, next) => {

    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        res.status(200).json("the view has been increased.")
    } catch (error) {
        next(error)
    };
}

//TREND VIDEOS
export const trend = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos)
        const token = jwt.sign({ id: findUser._id }, process.env.JWT)

        res.cookie("access_token", token).status(200).json(videos)

    } catch (error) {
        next(error)
    };
}
//RANDOM VIDEOS
export const random = async (req, res, next) => {
    try {
        const videos = await Video?.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos)
        // const token = jwt?.sign({ id: videos.userId }, process?.env?.JWT)
        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // })
    } catch (error) {
        next(error)
    };
}
//SUBSCRIBES VIDEOS
export const sub = async (req, res, next) => {
    try {
        const user = await Users?.findByIdAndUpdate(req.user.id)
        const subscribedChannels = user?.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels?.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        );

        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))

    } catch (error) {
        next(error)
    };
}

//TREND VIDEOS
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    };
}

//TREND VIDEOS
export const search = async (req, res, next) => {
    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);

        res.status(200).json(videos)
    } catch (error) {
        next(error)
    };
}