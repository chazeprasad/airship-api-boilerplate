"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const jwt = require('jsonwebtoken');
class JsonWebToken {
    static Encode(payload) {
        var token = jwt.sign(payload, JsonWebToken.SECRET, { expiresIn: '2h' });
        return token;
    }
    static Decode(token) {
        let body = jwt.decode(token, JsonWebToken.SECRET);
        if (!body) {
            throw new error_1.UnprocessableEntityError();
        }
        return body;
    }
}
JsonWebToken.SECRET = '1d62ada3461$a091c38c95c!0388c8a1a2';
exports.JsonWebToken = JsonWebToken;
