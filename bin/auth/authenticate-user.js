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
const bcrypt = require("bcrypt");
const user_model_1 = require("../model/user.model");
const error_1 = require("../util/error");
const message_1 = require("../util/message");
const json_web_token_1 = require("../util/json-web-token");
class AuthenticateUser {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.checkUserExist();
            if (user && (yield this.authenticate(user))) {
                return yield json_web_token_1.JsonWebToken.Encode({ uid: user._id });
            }
        });
    }
    checkUserExist() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield user_model_1.User.findOne({ username: this.username });
            if (!user) {
                throw new error_1.UnauthorizedError();
            }
            return user;
        });
    }
    authenticate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user) {
                let match = bcrypt.compareSync(this.password, user.password);
                if (match) {
                    return true;
                }
                else {
                    throw new error_1.AuthenticationError(message_1.Message.UNAUTHORIZED);
                }
            }
        });
    }
}
exports.AuthenticateUser = AuthenticateUser;
