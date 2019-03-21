import { ActionController, Api, Post } from "@appengine/airship";
import { Request, Response, NextFunction } from 'express'
import { AuthenticateUser } from "../auth/authenticate-user";
import { User, IUserModel } from "../model/UserModel";
import { AccountExistError } from "../util/error";
import { Status } from "../util/status";
import { Message } from "../util/message";
import { validateUser, validateLoginPayload } from "../util/policy";


@Api('/auth')
export class AuthenticationController extends ActionController {

    constructor(){
        super()
    }

    @Post('/login', [validateLoginPayload])
    async login(req:Request, res:Response, next:NextFunction) {
        try {
            const token = await new AuthenticateUser(req.body.username, req.body.password).execute();
            const user = await User.findOne({email:req.body.username}).select('-password').exec()
            res.json({token: token, user: user});
            
        } catch (error) {
            next (error)
        }
    }

    @Post('/signup', [validateUser])
    async signup(req:Request, res:Response, next:NextFunction) {
        try {
            let exist = await User.findOne({username: req.body.username})
            if(exist){
                throw new AccountExistError();
            }
            let user: IUserModel = await User.create(req.body)

            let token = await new AuthenticateUser(req.body.username, req.body.password).execute();
            
            user = await User.findOne({email:req.body.username}).select('-password').exec()
            
            res.status(Status.CREATED).json({
                token: token,
                message: Message.ACCOUNT_CREATED,
                user: user
            })
        } catch (error) {
            next(error);
        }
       
    }

}