import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';


const app = express();
app.use(cors({ origin: ['http://localhost:3000',"https://kamalkumar7.github.io, https://yt-vercel.vercel.app"], credentials:true,            //access-control-allow-credentials:true
optionSuccessStatus:200}));
dotenv.config();

app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);


app.get('/hi',(req,res)=>{    
  
  res.cookie("newcookie","cookie").status(200).json({"cookieset":"cookieset","env":process.env.MONGO, "JWT":process.env.JWT,"conn":conn});

})
var conn =5;



app.use((err, req, res, next) => {
    
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });

});

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
      conn =9;

    
    })
    .catch((err) => {
      throw err;
    });
  };

  app.listen(800, () => {
    console.log("Connected to Server");
    conn =7;

  });
connect();
