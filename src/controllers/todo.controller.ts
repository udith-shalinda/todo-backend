import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import { getRepository } from "typeorm";
import { validate } from "class-validator";

// import { User } from "../entity/User";
import config from "../config/config";

class ToDoController {
  static addTODO = async (req: Request, res: Response) => {
    res.status(200).send('token');
  };
  static updateTODO = async (req: Request, res: Response) => {
    res.status(200).send('token');
  };
  static deleteTODO = async (req: Request, res: Response) => {
    res.status(200).send('token');
  };
}

export default ToDoController;