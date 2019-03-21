import { Request, Response, NextFunction } from 'express'
import { Api, Get, Post, Put, Delete, ActionController } from '@appengine/airship';
import { User, IUserModel, IUser } from '../model/UserModel';
import { RecordNotFoundError, AccountExistError } from '../util/error';
import { Message } from '../util/message';
import { AuthenticateUser } from '../auth/authenticate-user';
import { Status } from '../util/status';
import { authoriseRequest, validateUser, setUser } from '../util/policy';


@Api('/user')
export class UserController extends ActionController {
    public router;

    constructor() {
        super();
        
    }

    @Post('/', [validateUser])
    async create(req:Request, res:Response, next:NextFunction) {
        try {
            
            let exist = await User.findOne({username: req.body.username})
            if(exist){
                throw new AccountExistError();
            }
            let user: IUserModel = await User.create(req.body)

            let token = await new AuthenticateUser(req.body.username, req.body.password).execute();
            
            res.status(Status.CREATED).json({
                token: token,
                message: Message.ACCOUNT_CREATED
            })
        } catch (error) {
            next(error);
        }
       
    }

    @Get('/')
    async index(req:Request, res:Response, next:NextFunction) {
        let users: Array<IUserModel> = await User.find().select('-password').exec();

        res.json({
            content: users
        });

    }

    @Get('/:id')
    async show(req:Request, res:Response, next:NextFunction) {
        
        res.json({
            content: req.context.item
        });
    }

    @Put('/:id')
    async update(req:Request, res:Response, next:NextFunction) {
        let userParams = req.body
        await req.context.item.updateOne(userParams)
        res.sendStatus(Status.NO_CONTENT);
    }

    @Delete('/:id')
    async destroy(req:Request, res:Response, next:NextFunction) {
        let userParams = req.body
        await req.context.item.remove()
        res.sendStatus(Status.NO_CONTENT);
    }
}
