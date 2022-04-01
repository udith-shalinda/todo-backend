import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
// import * as cors from "cors";
import routes from "./src/routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
// app.use(cors());
app.use(bodyParser.json({strict: false}));
app.use("/", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});