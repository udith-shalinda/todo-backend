import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
// import * as cors from "cors";
import routes from "./src/routes";
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoUlr: string = process.env.mongoURL|| "";

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
mongoose.connect("mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/todo-app")
.then(() => {
    console.log('db connected')
}).catch((error) => {
    console.log("mongoerror", error);
});
// cors issue fixed
app.use((req,res,next)=>{
  res.setHeader("Access-control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS"); 
  next();
});
app.use(bodyParser.json({strict: false}));
app.use("/", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});