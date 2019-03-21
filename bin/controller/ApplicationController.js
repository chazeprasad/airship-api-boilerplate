"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const airship_1 = require("@appengine/airship");
let ApplicationController = class ApplicationController extends airship_1.ActionController {
    constructor() {
        super();
    }
    getTodo(req, res, next) {
        res.status(airship_1.Status.OK).send("Hello.. Hi..!!");
    }
};
__decorate([
    airship_1.Get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getTodo", null);
ApplicationController = __decorate([
    airship_1.Api('/'),
    __metadata("design:paramtypes", [])
], ApplicationController);
exports.ApplicationController = ApplicationController;
