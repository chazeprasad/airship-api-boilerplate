import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express'
import { Message } from './message';
import { JsonWebToken } from './json-web-token';
import { User } from '../model/UserModel';
import { MissingTokenError, UnauthorizedError, ValidationError, RecordNotFoundError } from './error';


export async function authoriseRequest(req:Request, res:Response, next:NextFunction){
    let header = req.get('Authorization');
        let decoded_auth_token
        let user
        try {
            if(!header){
                next( new MissingTokenError() )
            }
            const tokenArray = header.split(" ");
            if(tokenArray.length !== 2) {
                next( new MissingTokenError() )
            }
            decoded_auth_token = await JsonWebToken.Decode(tokenArray[1]); 

            let user = await User.findOne({_id: decoded_auth_token.uid})
            


            if(!user){
                next( new UnauthorizedError() )
            }
            req.context.currentUser = user;
            next()
        } catch (error) {
            console.log(error)
            next(error) 
        }
}

export async function validateUser(req:Request, res:Response, next:NextFunction){
    req.body.email = req.body.username;
    let schema = Joi.object().keys({
        username: Joi.string().email().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string(),
        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.number(),
        role: Joi.number()

    });
    
    try {
        await Joi.validate(req.body, schema)  
        next()
    } catch (error) {
        next( new ValidationError(error.message.replace(/\"/g, "'")) )
    }
}

export async function validateLoginPayload(req:Request, res:Response, next:NextFunction){
    
    let schema = Joi.object().keys({
        username: Joi.string().email().required(),
        password: Joi.string().required()

    });
    
    try {
        await Joi.validate(req.body, schema)  
        next()
    } catch (error) {
        next( new ValidationError(error.message.replace(/\"/g, "'")) )
    }
}

export async function setUser(req:Request, res:Response, next:NextFunction){
    
    try {
        let user  = await User.findOne({_id: req.params.id}).select('-password').exec(); 
        if(!user){
            next(new RecordNotFoundError()) 
        } 
        req.context.item = user;
        next()
    } catch (error) {
        console.log(error)
        next(new RecordNotFoundError(error.message))
    }
}

