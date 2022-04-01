import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import { getRepository } from "typeorm";
import { validate } from "class-validator";

// import { User } from "../entity/User";
import config from "../config/config";
import { ITodo } from "../interfaces/todo.interface";
import TODO from "../model/todo.model";

class ToDoController {
  static getMyToDo = async (req: Request, res: Response) => {
    let { name, completed, ownerId } = req.body;
    //get user id from the token
    const token = <string>req.headers["authorization"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token.split(" ")[1], config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }
    const { userId } = jwtPayload;
    try {
      const todo = await TODO.find({ownerId: userId});
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo adding failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };
  static addTODO = async (req: Request, res: Response) => {
    let { name, completed, ownerId } = req.body;
    //get user id from the token
    const token = <string>req.headers["authorization"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token.split(" ")[1], config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }
    const { userId } = jwtPayload;
    try {
      const newTODO: ITodo = new TODO({
        name,
        completed,
        ownerId: userId,
      });
      const todo = await newTODO.save();
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo adding failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };
  static updateTODO = async (req: Request, res: Response) => {
    let { name, completed, _id } = req.body;
    try {
      const newTODO: ITodo = new TODO({
        _id,
        name,
        completed,
      });
      const todo = await TODO.updateOne({_id}, newTODO);
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo update failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };
  static deleteTODO = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      const todo = await TODO.deleteOne({ _id: id });
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo delete failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };
}

export default ToDoController;
