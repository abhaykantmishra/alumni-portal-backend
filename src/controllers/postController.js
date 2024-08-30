import Post from "../models/postModel.js";
import { uploadImageOnCloudinary } from "../services/cloudinary.js";
import User from "../models/userModel.js"
import mongoose from "mongoose";

async function postJob(req,res){
    try {
        // console.log("body:",req.body);
        const {postedBy,postedByName,title,description,category,url} = req.body;
        if(!title || !postedBy || !postedByName || !category || !description){
            return res.status(400).json({
                message:"all above fields are required!"
            })
        }
        if(!(title?.trim()) || !(postedBy?.trim()) || !(category?.trim()) || !(description?.trim()) || !(postedByName?.trim())){
            return res.status(400).json({
                message:"all fields are required!"
            })
        }
        // console.log(title,postedBy,postedByName,description,category,url);

        const usr = await User.findById(postedBy);
        if(!usr){
            return res.status(404).json({
                msg:"no such user exist with given userId"
            })
        }



        const file = req.file;

        // uploading on cloudinary =>

        let thumbnailInfo = {}
        if(file){
            const filePath = file.path;
            if(!filePath){
                return res.status(500).json({
                    msg:"Something went wrong while uploading image file"
                })
            }
            const cloudinaryResponse = await uploadImageOnCloudinary(filePath);
            if(!cloudinaryResponse){
                return res.status(500).json({
                    msg:"Something went wrong while uploading on Clodinary"
                })
            }
            thumbnailInfo = {
                ...thumbnailInfo,
                fileUrl:cloudinaryResponse.secure_url,
                asset_id:cloudinaryResponse.asset_id,
                public_id:cloudinaryResponse.public_id,
                api_key:cloudinaryResponse.api_key,
            }
        }

        if(!thumbnailInfo){
            return res.status(500).json({
                msg:"something went wrong!!!"
            })
        }

        // creating new post =>
        const createdPost = await Post.create({
            postedBy:postedBy?.trim(),
            postedByName:postedByName?.trim(),
            description : description?.trim(),
            category:category,
            title:title?.trim(),
            url:url?.trim(),
            thumbnail:thumbnailInfo?.fileUrl,
            thumbnailInfo:thumbnailInfo,
        })

        if(!createdPost){
            return res.status(500).json({
                msg:"Something went wrong while creating a post"
            })
        }

        return res.status(201).json({
            msg:"post created successfully",
            post:createdPost,
        })


    } catch (error) {
        console.log(`uploading error : ${error}`);
        return res.status(500).json({
            msg:"Something went wrong",
            error:error
        })
    }
}

async function getJobs(req,res){
    try {
        const allJobs = await Post.find({});
        console.log(allJobs);
        if(!allJobs){
            return res.status(500).json({
                msg:"something went wrong while fetching jobs!"
            })
        }

        return res.status(200).json({
            msg:"get all recent jobs",
            jobs:allJobs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"something went wrong while fetching jobs!"
        })
    }
}

async function getUserPosts(req,res){
    const userId = req.body;
    // console.log(userId);
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
          }
      
          // Convert userId to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);
        console.log(userId);
        const userPosts = await Post.find({ postedBy: objectId });

        console.log(userPosts);
        if(!userPosts){
            return res.status(500).json({
                msg:"something went wrong while fetching user posts!"
            })
        }

        return res.status(200).json({
            msg:"sent user recent jobs",
            posts:userPosts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:"something went wrong while fetching jobs!"
        })
    }
}

export {
    postJob,
    getJobs,
    getUserPosts
}