/* import app from './App';

app.listen(2020, () => {
    console.log('Example app listening on port 5678!');
}) */

import * as path from 'path';
import * as http from 'http';
import {Airship} from '@appengine/airship'
import mongoose = require("mongoose");

import "./config/AppConfig";

import {AppController} from './controller/AppController';

const ROOT_DIR = path.join(__dirname, '..')
const STATIC_DIR = ROOT_DIR + '/public'

let airship: Airship = new Airship();
airship.rootDir = ROOT_DIR;
airship.staticDir = STATIC_DIR;
airship.init();

const appCtrl = new AppController();

airship.app.use('/', appCtrl.router);

const server = http.createServer(airship.app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(airship.port);

initMongoose();


function initMongoose () {
    const DB_URL = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://localhost:27017/api_stub_development';
    
    console.log('=== DB_URL ===')
    console.log(DB_URL)
    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL, { useNewUrlParser: true }).then(
        () => { 
            console.log('Init Mongoose..')
         },
        err => { console.log(err.message) }
    );
}

// airship.app.use((req:Request, res:Response, next:NextFunction) => {
//     req.context = new Context();
// })


function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof airship.port === 'string') ? 'Pipe ' + airship.port : 'Port ' + airship.port;
    console.log('bind');
    console.log(bind);
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            console.log(error)
            throw error;
    }
}

function onListening(): void {
//    debug('server')
    let addr:any = server.address();
    addr.address = addr.address == '::' ? '127.0.0.1' : addr.address

    // let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    airship.log(`server started on http://${addr.address}:${addr.port}; press Ctrl-C to terminate.'`); // eslint-disable-line no-console
    console.log(`server started on http://${addr.address}:${addr.port}; press Ctrl-C to terminate.'`); // eslint-disable-line no-console

    // debug(`Listening on ${bind}`);
}

function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

export { server }