"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status = require('http-status');
const error_1 = require("../../paperboat/core/error");
const status_1 = require("./status");
const message_1 = require("./message");
class AuthenticationError extends error_1.ApiError {
    constructor(message = message_1.Message.INAVALID_USERNAME, status = status_1.Status.UNPROCESSABLE_ENTITY, isPublic = true) {
        super(message, status, isPublic);
    }
}
exports.AuthenticationError = AuthenticationError;
class RecordNotFoundError extends error_1.ApiError {
    constructor(message = message_1.Message.NOTE_FOUND, status = status_1.Status.NOT_FOUND) {
        super(message, status, true);
    }
}
exports.RecordNotFoundError = RecordNotFoundError;
class InvalidCredentialError extends error_1.ApiError {
    constructor(message = message_1.Message.INVALID_CREDENTIALS, status = status_1.Status.UNPROCESSABLE_ENTITY) {
        super(message, status, true);
    }
}
exports.InvalidCredentialError = InvalidCredentialError;
class UnprocessableEntityError extends error_1.ApiError {
    constructor(message = message_1.Message.INVALID_TOKEN, status = 422) {
        super(message, status, true);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class MissingTokenError extends error_1.ApiError {
    constructor(message = message_1.Message.MISSING_TOKEN, status = status_1.Status.NOT_ACCEPTABLE) {
        super(message, status, true);
    }
}
exports.MissingTokenError = MissingTokenError;
class UnauthorizedError extends error_1.ApiError {
    constructor(message = message_1.Message.UNAUTHORIZED, status = status_1.Status.UNAUTHORIZED) {
        super(message, status, true);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class AccountExistError extends error_1.ApiError {
    constructor(message = message_1.Message.ACCOUNT_EXIST, status = status_1.Status.CONFLICT) {
        super(message, status, true);
    }
}
exports.AccountExistError = AccountExistError;
class ValidationError extends error_1.ApiError {
    constructor(message = message_1.Message.INVALID_PAYLOAD, status = status_1.Status.UNPROCESSABLE_ENTITY) {
        super(message, status, true);
    }
}
exports.ValidationError = ValidationError;
