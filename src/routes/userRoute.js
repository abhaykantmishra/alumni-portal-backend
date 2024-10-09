import { Router } from "express";
import { registerUser,loginUser,getUserById,
    updateUserProfile,getInvitations,getConnectedUsers,
    createInvitation,cancleInvitation,acceptInvitation,
    deleteconnection,getCollegeUsers
 } from "../controllers/userController.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route("/getuser").post(getUserById);
userRouter.route("/updateprofile").post(updateUserProfile);

userRouter.route("/getinvitations").post(getInvitations); // userId
userRouter.route("/getconnectedusers").post(getConnectedUsers); // userId

userRouter.route('/createinvitation').post(createInvitation); // toUserId,fromuserId

userRouter.route('/cancleinvitation').post(cancleInvitation); // userIdToRemove, fromUserId

userRouter.route('/acceptinvitation').post(acceptInvitation); // userIdToAdd, toUserId

userRouter.route('/deleteconnection').post(deleteconnection); // userIdToRemove , fromUserId

userRouter.route('/getcollegeusers').post(getCollegeUsers); // collegeName

export {userRouter};