"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("src/paperboat/core");
const message_1 = require("./message");
const status_1 = require("./status");
class ExceptionHandler extends core_1.Paper {
    static RecordNotFound(res, message = message_1.Message.NOTE_FOUND) {
        res.status(status_1.Status.NOT_FOUND).json(message);
    }
}
exports.ExceptionHandler = ExceptionHandler;
