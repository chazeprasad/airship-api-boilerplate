"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor() {
    }
}
Message.NOTE_FOUND = 'Sorry, record not found.';
Message.INVALID_CREDENTIALS = 'Invalid credentials';
Message.INVALID_TOKEN = 'Invalid token';
Message.MISSING_TOKEN = 'Missing token';
Message.INAVALID_USERNAME = 'Invalid username. Enter a valid Email or Phone Number';
Message.UNAUTHORIZED = 'Unauthorized request';
Message.ACCOUNT_CREATED = 'Account created successfully';
Message.ACCOUNT_NOT_CREATED = 'Account could not be created';
Message.EXPIRED_TOKEN = 'Sorry, your token has expired. Please login to continue.';
Message.ACCOUNT_EXIST = 'Username already exist';
Message.INVALID_PAYLOAD = 'Inavlid payload';
exports.Message = Message;
