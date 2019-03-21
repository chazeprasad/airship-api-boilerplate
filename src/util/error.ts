const status = require('http-status');

import { ApiError } from "@appengine/airship";
import { Status } from "./status";
import { Message } from "./message";


export class AuthenticationError extends ApiError {
    constructor(message=Message.INAVALID_USERNAME, status = Status.UNPROCESSABLE_ENTITY , isPublic = true){
        super(message, status, isPublic)
    }
}

export class RecordNotFoundError extends ApiError {
    constructor(message= Message.NOTE_FOUND, status = Status.NOT_FOUND){
        super(message, status, true)
    }
}

export class InvalidCredentialError extends ApiError {
    constructor(message=Message.INVALID_CREDENTIALS, status = Status.UNPROCESSABLE_ENTITY){
        super(message, status, true)
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(message = Message.INVALID_TOKEN, status = 422){
        super(message, status, true)
    }
}

export class MissingTokenError extends ApiError {
    constructor(message = Message.MISSING_TOKEN, status = Status.NOT_ACCEPTABLE){
        super(message, status, true)
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = Message.UNAUTHORIZED, status = Status.UNAUTHORIZED){
        super(message, status, true)
    }
}

export class AccountExistError extends ApiError {
    constructor(message = Message.ACCOUNT_EXIST, status = Status.CONFLICT){
        super(message, status, true)
    }
}

export class ValidationError extends ApiError {
    constructor(message = Message.INVALID_PAYLOAD, status = Status.UNPROCESSABLE_ENTITY){
        super(message, status, true)
    }
}
