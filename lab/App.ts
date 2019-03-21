import * as path from 'path';
import {Airship} from '@appengine/airship'

//use q promises
global.Promise = require("q").Promise;

const ROOT_DIR = path.join(__dirname, '..')
const STATIC_DIR = ROOT_DIR + '/public'

let airship: Airship = new Airship();
airship.rootDir = ROOT_DIR;
airship.staticDir = STATIC_DIR;
airship.init();

import {AppController} from '../src/controller/AppController';

const appCtrl = new AppController();

airship.app.use('/', appCtrl.router);


export default airship.app;