import { Request, Response, NextFunction } from 'express'
import { ActionController, Get, Api, Post, Put, Status } from "@appengine/airship";


@Api('/')
class AppController extends ActionController {
    constructor(){
        super();

    }

    @Get('/')
    getTodo(req:Request, res: Response, next:NextFunction){
        res.status(Status.OK).send("Hello.. Hi..!!")
    }

}

export { AppController };