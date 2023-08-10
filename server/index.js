import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors({ origin: ['http://localhost:3000',"https://kamalkumar7.github.io, https://yt-vercel.vercel.app"], credentials:true,            //access-control-allow-credentials:true

optionSuccessStatus:200}));



const connect = () => {
  // console.log(process.env.MONGO);
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");

    
    })
    .catch((err) => {
      throw err;
    });

    app.listen(800, () => {
      console.log("Connected to Server");
  
    });

  };

connect();



app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);


app.get('/hi',(req,res)=>{    
  
  res.cookie("newcookie","cookie").status(200).json({"cookieset":"cookieset","env":process.env.MONGO, "JWT":process.env.JWT,"conn":conn});

})

app.get('/happy',(req,res)=>{
  res.json("This is awesome");
})



app.use((err, req, res, next) => {
    
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });

});




