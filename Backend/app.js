import express from  "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
app.use(cors({Credential: true,origin:"http://localhost:3000"}));
app.use(cookieParser());
app.use(express.json());
app.use("/api",router);



mongoose.connect("mongodb+srv://admin:0VdWHzg3o0zJqvA2@cluster0.ux2pmgf.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    app.listen(5000);
    console.log("database is connected & listening to port 5000");
})
.catch((err)=>console.log(err));







