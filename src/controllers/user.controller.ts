import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import { getRepository } from "typeorm";
import { validate } from "class-validator";
import User from '../model/user.model';
import {IUser} from '../interfaces/user.interface';
// import { User } from "../entity/User";
import config from "../config/config";
import bcrypt from 'bcryptjs';

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send('invalid input');
    }else {
      const user: IUser| null = await User.findOne({username});
      if(!user){
        return res.status(404).send({message: 'user not found'});
      }else{
        const isCorrectPass: boolean = await bcrypt.compare(password, user.password);
        console.log(isCorrectPass, password, user.password);
        
        if(!isCorrectPass){
          return res.status(401).send({message: 'Incorrect Password'});
        }else{
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
          );
          //Send the jwt in the response
          return res.status(200).send({...user, password: undefined, token});
        }
      }
    }
  };
  
  static newUser = async (req: Request, res: Response) => {
      try {
        //Get parameters from the body
        let { username, password } = req.body;
        const hash = await bcrypt.hash(req.body.password,10)
        const user: IUser = new User({
            username: username,
            password: hash
        });
        // save user
        const newUser = await user.save();
        if(newUser){
            return res.status(200).send(newUser);
        }else{
            return res.status(300).send({message: 'Save failed'});
        }
    } catch (error) {
        return res.status(300).send({message: error});
        
    }
    
  }
  static whoami = async (req: Request, res: Response) => {
    res.status(200).send(true);
  }
}

export default AuthController;