import { UnprocessableEntityError } from "./error";

const jwt = require('jsonwebtoken');

export class JsonWebToken {

    private static SECRET:string = '1d62ada3461$a091c38c95c!0388c8a1a2'

    public static Encode(payload: any):string {
        var token = jwt.sign(payload, JsonWebToken.SECRET, {expiresIn: '2h'});
        return token;
    }

    public static Decode(token:string):any {
        let body = jwt.decode(token, JsonWebToken.SECRET);
        if(!body) { 
            throw new UnprocessableEntityError()
        }
        return body
    }
}