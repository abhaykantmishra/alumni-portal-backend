import "dotenv/config"
import express from "express"
import cors from "cors"
import {connectDB} from "./src/db/connection.js"

const app = express();
// DB_NAME for a collections in Db =>
const DB_NAME = "alumini";
const PORT = process.env.PORT || 3000;

// connecting mongo-db =>
const mongoDB_uri = `${process.env.MONGODB_URI}/${DB_NAME}`

connectDB(mongoDB_uri)
.then(() => {
    app.listen(PORT , ()=>{
        console.log(`Server started at http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log(`connection failed : ${err}`);
});



app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin: '*',
    credentials: true
}))

// app.use('/api/user' , user);

app.get('/', (req,res) => {
    return res.json({
        msg:"Welcome to homepage of alumni portal backend",
    })
})
