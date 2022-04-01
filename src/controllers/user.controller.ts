import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
// import { getRepository } from "typeorm";
import { validate } from "class-validator";

// import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    console.log(req.body);
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send('invalid input');
    }

    // //Get user from database
    // const userRepository = getRepository(User);
    // let user: User;
    // try {
    //   user = await userRepository.findOneOrFail({ where: { username } });
    // } catch (error) {
    //   res.status(401).send();
    // }

    // //Check if encrypted password match
    // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //   res.status(401).send();
    //   return;
    // }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: username, username: username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.status(200).send({token});
  };
  
  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password } = req.body;
    console.log(username);
    // let user = new User();
    // user.username = username;
    // user.password = password;
    // user.role = role;
  
    //Validade if the parameters are ok
    // const errors = await validate(user);
    // if (errors.length > 0) {
      res.status(200).send({username, password});
      return;
    // }
  }
  static whoami = async (req: Request, res: Response) => {
    res.status(200).send(true);
  }
}

export default AuthController;