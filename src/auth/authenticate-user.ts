import * as bcrypt from 'bcrypt';
import { IUserModel, User, IUser } from "../model/user.model";
import { InvalidCredentialError, AuthenticationError, UnauthorizedError } from '../util/error';
import { Message } from '../util/message';
import { JsonWebToken } from '../util/json-web-token';

export class AuthenticateUser {

    private username:string;
    private password:string;

    constructor(username:string, password:string ) {
        this.username = username;
        this.password = password;
    }

    public async execute() {
        let user:any = await this.checkUserExist();
        if(user && await this.authenticate(user)) {
            return await JsonWebToken.Encode({ uid: user._id });
        }
    } 

    private async checkUserExist() {
        let user: IUserModel = await User.findOne({username: this.username});
        if(!user) {
            throw new UnauthorizedError();
        }
        return user;  
    }
    private async authenticate(user:any) {
        if(user) {
            let match = bcrypt.compareSync(this.password, user.password);
            if (match) {
                return true
            } else {
                throw new AuthenticationError(Message.UNAUTHORIZED)
            }
        }
    }
}