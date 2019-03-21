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
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
var UserSchema = new mongoose_1.Schema({
    isActive: { type: Boolean, default: false },
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    phone: String,
    homePhone: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    role: { type: Number, default: 1 }
}, { timestamps: { createdAt: true }, strict: true });
exports.UserSchema = UserSchema;
// }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
var self = UserSchema;
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let doc = this;
        try {
            if (!doc.isModified('password')) {
                return next();
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(doc.password, salt);
            doc.password = hash;
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
});
UserSchema.methods.fullName = function () {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
const User = mongoose_1.model("User", UserSchema);
exports.User = User;
