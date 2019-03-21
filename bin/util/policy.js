"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const json_web_token_1 = require("./json-web-token");
const UserModel_1 = require("../model/UserModel");
const error_1 = require("./error");
function authoriseRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let header = req.get('Authorization');
        let decoded_auth_token;
        let user;
        try {
            if (!header) {
                next(new error_1.MissingTokenError());
            }
            const tokenArray = header.split(" ");
            if (tokenArray.length !== 2) {
                next(new error_1.MissingTokenError());
            }
            decoded_auth_token = yield json_web_token_1.JsonWebToken.Decode(tokenArray[1]);
            let user = yield UserModel_1.User.findOne({ _id: decoded_auth_token.uid });
            if (!user) {
                next(new error_1.UnauthorizedError());
            }
            req.context.currentUser = user;
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
exports.authoriseRequest = authoriseRequest;
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
            yield Joi.validate(req.body, schema);
            next();
        }
        catch (error) {
            next(new error_1.ValidationError(error.message.replace(/\"/g, "'")));
        }
    });
}
exports.validateUser = validateUser;
function validateLoginPayload(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let schema = Joi.object().keys({
            username: Joi.string().email().required(),
            password: Joi.string().required()
        });
        try {
            yield Joi.validate(req.body, schema);
            next();
        }
        catch (error) {
            next(new error_1.ValidationError(error.message.replace(/\"/g, "'")));
        }
    });
}
exports.validateLoginPayload = validateLoginPayload;
function setUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield UserModel_1.User.findOne({ _id: req.params.id }).select('-password').exec();
            if (!user) {
                next(new error_1.RecordNotFoundError());
            }
            req.context.item = user;
            next();
        }
        catch (error) {
            console.log(error);
            next(new error_1.RecordNotFoundError(error.message));
        }
    });
}
exports.setUser = setUser;
