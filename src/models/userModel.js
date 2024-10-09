import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            // unique:true
        },
        name:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        contactNumber:{
            type:String,
        },
        collegeName:{
            type:String,
            required:true,
        },
        profileImage:{
            type:String,
        },
        location:{
            type:String
        },
        roll:{
            type:String
        },
        branch:{
            type:String,
        },
        state:{
            type:String,
        },
        batch:{
            type:String,
        },
        companyName:{
            type:String,
        },
        jobTitle:{
            type:String,
        },
        connectedUsers:[
            {
                type:mongoose.Types.ObjectId,
                ref:"User",
            }
        ],
        invitations:[
            {
                type:mongoose.Types.ObjectId,
                ref:"User",
            }
        ]
    },
    {
        timestamps:true
    }
)

userSchema.methods.generateAccessToken = function () {
    const jwtToken = jwt.sign(
        {
            _id:this._id,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:`${process.env.ACCESS_TOKEN_EXPIRE}`}
    );

    return jwtToken;
}

const User = mongoose.model("User",userSchema);

export default User;