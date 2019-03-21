import mongoose = require("mongoose");
import * as Faker from 'faker'

import { IUserModel, IUser, User } from '../src/model/UserModel';


export class Seeder {

    private domain:string
 
    constructor(){
       
    }
    init(){
        this.domain = process.env.DOMAIN ||  '';
        
        this.initMongoose()
    }

    async initMongoose() {
        const DB_URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/api_stub_development';
        
        console.log('=== DB_URL ===')
        console.log(DB_URL)
        //use q promises
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(
            async () => { 
                await this.dropDatabase();
                await this.seed();
                process.exit(0);
             },
            err => { console.log(err.message) }
        );
    }

    async dropDatabase(){
        await mongoose.connection.db.dropDatabase();
    }

    async createAdmin(){
        let payload:IUser = {}
        payload.role = 2
        payload.password = 'allowme'
        payload.firstName = 'Prasad'
        payload.lastName = 'Sivanandan'
        payload.email = 'chazeprasad@gmail.com';
        payload.username = payload.email
        payload.isActive = true
        payload.phone = '+919542685141'
        payload.homePhone = '+919542685141'
        payload.address = Faker.address.streetAddress()
        payload.city = Faker.address.city()
        payload.state = Faker.address.state()
        payload.zip = parseInt(Faker.address.zipCode())

       let prasad = await  User.create(payload);

        payload = {}
        payload.role = 1
        payload.password = 'allowme'
        payload.firstName = 'Prasad'
        payload.lastName = 'Sivanandan'
        payload.email = 'prasad@abc.com';
        payload.username = payload.email
        payload.isActive = true
        payload.phone = '+919542685141'
        payload.homePhone = '+919542685141'
        payload.address = Faker.address.streetAddress()
        payload.city = Faker.address.city()
        payload.state = Faker.address.state()
        payload.zip = parseInt(Faker.address.zipCode())

       let seller = await  User.create(payload);

    }

     async createUser(){
        let payload:IUser = {}
        payload.password = 'allowme'
        payload.firstName = Faker.name.firstName()
        payload.lastName = Faker.name.firstName()
        payload.email = Faker.internet.email(payload.firstName, payload.lastName,'xyc');
        payload.username = payload.email
        payload.isActive = true
        payload.phone = '+919542685141'
        payload.homePhone = '+919542685141'
        payload.address = Faker.address.streetAddress()
        payload.city = Faker.address.city()
        payload.state = Faker.address.state()
        payload.zip = parseInt(Faker.address.zipCode())
        
        let user:IUserModel = await User.create(payload)


        return user;
    }
    

    async seed(){
        await this.createAdmin();
        const userCount:number = 10;
        for( let i:number = 0; i< userCount; i++) {
            await this.createUser();
        }
    }
    randomRange(min,max): number // min and max included
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

}

