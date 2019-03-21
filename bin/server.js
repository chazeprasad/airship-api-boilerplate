"use strict";
/* import app from './App';

app.listen(2020, () => {
    console.log('Example app listening on port 5678!');
}) */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const http = require("http");
const airship_1 = require("@appengine/airship");
const ApplicationController_1 = require("./controller/ApplicationController");
const ROOT_DIR = path.join(__dirname, '..');
const STATIC_DIR = ROOT_DIR + '/public';
let airship = new airship_1.Airship();
airship.rootDir = ROOT_DIR;
airship.staticDir = STATIC_DIR;
airship.init();
const todo = new ApplicationController_1.ApplicationController();
airship.app.use('/', todo.router);
const server = http.createServer(airship.app);
exports.server = server;
server.on('error', onError);
server.on('listening', onListening);
server.listen(airship.port);
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
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
            console.log(error);
            throw error;
    }
}
function onListening() {
    //    debug('server')
    let addr = server.address();
    addr.address = addr.address == '::' ? '127.0.0.1' : addr.address;
    // let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    airship.log(`server started on http://${addr.address}:${addr.port}; press Ctrl-C to terminate.'`); // eslint-disable-line no-console
    console.log(`server started on http://${addr.address}:${addr.port}; press Ctrl-C to terminate.'`); // eslint-disable-line no-console
    // debug(`Listening on ${bind}`);
}
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
