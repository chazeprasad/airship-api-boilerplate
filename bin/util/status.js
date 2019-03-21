"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Status {
    constructor() {
    }
}
Status.OK = 200;
Status.CREATED = 201;
Status.ACCEPTED = 202;
Status.NO_CONTENT = 204;
Status.RESET_CONTENT = 205;
Status.BAD_REQUEST = 400;
Status.UNAUTHORIZED = 401;
Status.FORBIDDEN = 403;
Status.NOT_FOUND = 404;
Status.METHOD_NOT_ALLOWED = 405;
Status.NOT_ACCEPTABLE = 406;
Status.REQUEST_TIMEOUT = 408;
Status.CONFLICT = 409;
Status.UNPROCESSABLE_ENTITY = 422;
Status.INTERNAL_SERVER_ERROR = 500;
exports.Status = Status;
