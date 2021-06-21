"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var UserService_1 = require("../service/UserService");
var yup = __importStar(require("yup"));
var UserRepo_1 = require("../data/UserRepo");
var uuid_1 = require("uuid");
var EmailService_1 = require("../service/EmailService");
var bcrypt_1 = __importDefault(require("bcrypt"));
var configProvider_1 = __importDefault(require("../configProvider"));
var MB_FORGOT_PASSWORD_TOKEN_DAYS_TO_LIVE = configProvider_1.default().MB_FORGOT_PASSWORD_TOKEN_DAYS_TO_LIVE;
var add_1 = __importDefault(require("date-fns/add"));
var isBefore_1 = __importDefault(require("date-fns/isBefore"));
var validators_1 = require("./validators");
var authRouter = express_1.Router();
authRouter.use(body_parser_1.json());
var startSession = function (req, user) {
    if (req && user) {
        req.session.user = user;
    }
};
authRouter.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, e_1, email, password, user, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, yup
                        .object()
                        .shape({
                        email: validators_1.validateEmail,
                        password: validators_1.validatePassword,
                    })
                        .validate(req.body)];
            case 1:
                params = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                // don't do fail() this time, because it's a special case
                return [2 /*return*/, res.status(400).json({
                        message: "Validation failed",
                        errors: e_1.errors,
                    })];
            case 3:
                email = params.email;
                password = params.password;
                user = null;
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, UserService_1.checkPassword({ email: email, password: password })];
            case 5:
                user = _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_2 = _a.sent();
                console.error("Error while logging in", e_2);
                return [2 /*return*/, res.sendStatus(401)];
            case 7:
                if (user) {
                    startSession(req, user);
                    return [2 /*return*/, res.send(user)];
                }
                else {
                    return [2 /*return*/, res.sendStatus(401)];
                }
                return [2 /*return*/];
        }
    });
}); });
authRouter.post("/logout", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.session) {
            req.session.user = null;
        }
        return [2 /*return*/, res.sendStatus(200)];
    });
}); });
authRouter.post("/check", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
            return [2 /*return*/, res.json(req.session.user)];
        }
        else {
            return [2 /*return*/, res.sendStatus(401)];
        }
        return [2 /*return*/];
    });
}); });
authRouter.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    // utility function
    function fail(message, e) {
        var m = message || "Failed to create dev.";
        e && console.log(m, e);
        res.status(401).json({ message: m });
        return;
    }
    var params, e_3, confirmationToken, email, password, firstName, lastName, existingUser, recordsAffected, e_4, dbUser, newUser, confirmUrl, e_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
                    return [2 /*return*/, fail("You are already logged in.")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, yup
                        .object()
                        .shape({
                        email: validators_1.validateEmail,
                        password: validators_1.validatePassword,
                        firstName: validators_1.validateFirstName,
                        lastName: validators_1.validateLastName,
                    })
                        .validate(req.body)];
            case 2:
                params = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_3 = _b.sent();
                // don't do fail() this time, because it's a special case
                return [2 /*return*/, res.status(400).json({
                        message: "Validation failed",
                        errors: e_3.errors,
                    })];
            case 4:
                confirmationToken = uuid_1.v4();
                _b.label = 5;
            case 5:
                _b.trys.push([5, 8, , 9]);
                email = params.email, password = params.password, firstName = params.firstName, lastName = params.lastName;
                return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
            case 6:
                existingUser = _b.sent();
                if (existingUser) {
                    // no need to log, this is not an exception
                    return [2 /*return*/, fail("A dev with this email already exists in the database.")];
                }
                return [4 /*yield*/, UserService_1.createUser({ email: email, password: password, firstName: firstName, lastName: lastName, confirmationToken: confirmationToken })];
            case 7:
                recordsAffected = _b.sent();
                if (!recordsAffected) {
                    return [2 /*return*/, fail("Failed to create user.")];
                }
                return [3 /*break*/, 9];
            case 8:
                e_4 = _b.sent();
                return [2 /*return*/, fail(null, e_4)];
            case 9:
                _b.trys.push([9, 11, , 12]);
                return [4 /*yield*/, UserRepo_1.getUserByEmail(params.email)];
            case 10:
                dbUser = _b.sent();
                if (!dbUser) {
                    return [2 /*return*/, fail("Failed to create user.")];
                }
                newUser = UserService_1.sanitizeDbUser(dbUser);
                confirmUrl = "https://devcollective.io/auth/token?" + confirmationToken + "&email=" + encodeURIComponent(newUser.email);
                EmailService_1.sendEmail({
                    from: "noreply@devcollective.io",
                    subject: "Confirm your account",
                    to: newUser.email,
                    html: "\n        Thank you for registering an account at <a href=\"https://devcollective.io\">DevCollective.io</a>.<br/>\n        To confirm your account, please click <a href=\"" + confirmUrl + "\">here</a>, or visit the following URL:<br/>\n        " + confirmUrl + "<br/>\n        Thank you,<br/>\n        The DevCollective team.\n        ",
                });
                startSession(req, newUser);
                return [2 /*return*/, res.json(newUser)];
            case 11:
                e_5 = _b.sent();
                return [2 /*return*/, fail("Unexpected failure. User may or may not have been created. Aconfirmation email may not have been sent. Try logging in.")];
            case 12: return [2 /*return*/];
        }
    });
}); });
authRouter.get("/confirmAccount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, e_6, email, confirm, user, isMatch, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                schema = yup
                    .object()
                    .shape({
                    email: validators_1.validateEmail,
                    confirm: validators_1.validateUuid,
                })
                    .noUnknown(true)
                    .required();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, schema.validate(req.query)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                if (e_6.name === "ValidationError") {
                    return [2 /*return*/, res.status(400).json({ errors: e_6.errors })];
                }
                else {
                    console.error(e_6);
                    return [2 /*return*/, res.status(400).json({ message: "Validation failed" })];
                }
                return [3 /*break*/, 4];
            case 4:
                email = req.query.email;
                confirm = req.query.confirm;
                return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
            case 5:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "Validation failed" })];
                }
                if (!user.confirmationTokenHash) {
                    return [2 /*return*/, res.status(409).json({ message: "Account already validated." })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(confirm, user.confirmationTokenHash)];
            case 6:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ message: "Validation failed" })];
                }
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4 /*yield*/, UserRepo_1.updateUser(user.id, { confirmationTokenHash: null })];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                e_7 = _a.sent();
                console.error("Failed to erase the confirmationTokenHash for the user", e_7);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/, res.sendStatus(200)];
        }
    });
}); });
authRouter.post("/forgot/request", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, e_8, user, forgotPasswordToken, forgotPasswordTokenHash, confirmUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                schema = yup
                    .object()
                    .shape({
                    email: validators_1.validateEmail,
                })
                    .strict(true)
                    .noUnknown(true);
                return [4 /*yield*/, schema.validate(req.body)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_8 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [4 /*yield*/, UserRepo_1.getUserByEmail(req.body.email)];
            case 4:
                user = _a.sent();
                if (!user) {
                    // Obscure 200 for security purposes.
                    return [2 /*return*/, res.sendStatus(200)];
                }
                forgotPasswordToken = uuid_1.v4();
                return [4 /*yield*/, bcrypt_1.default.hash(forgotPasswordToken, 10)];
            case 5:
                forgotPasswordTokenHash = _a.sent();
                return [4 /*yield*/, UserRepo_1.updateUser(user.id, {
                        forgotPasswordTokenHash: forgotPasswordTokenHash,
                        forgotPasswordExpiry: add_1.default(new Date(), { days: MB_FORGOT_PASSWORD_TOKEN_DAYS_TO_LIVE }),
                    })];
            case 6:
                _a.sent();
                confirmUrl = "https://devcollective.io/auth/token?" + forgotPasswordToken + "&email=" + encodeURIComponent(user.email);
                return [4 /*yield*/, EmailService_1.sendEmail({
                        from: "noreply@devcollective.io",
                        to: user.email,
                        subject: "Your password reset link.",
                        html: "\n      We received a forgot password request from this email.<br/>\n      To reset your password, please click <a href=\"" + confirmUrl + "\">here</a>, or visit the following URL:<br/>\n      " + confirmUrl + "<br/>\n      Thank you,<br/>\n      The DevCollective team.\n    ",
                    })];
            case 7:
                _a.sent();
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
authRouter.post("/forgot/confirm", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var schema, e_9, user, isMatch, passwordHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                schema = yup
                    .object()
                    .shape({
                    email: validators_1.validateEmail,
                    token: validators_1.validateUuid,
                    password: validators_1.validatePassword,
                })
                    .strict(true)
                    .noUnknown(true);
                return [4 /*yield*/, schema.validate(req.body)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_9 = _a.sent();
                return [2 /*return*/, res.sendStatus(400)];
            case 3: return [4 /*yield*/, UserRepo_1.getUserByEmail(req.body.email)];
            case 4:
                user = _a.sent();
                if (!user ||
                    !user.forgotPasswordTokenHash ||
                    !user.forgotPasswordExpiry ||
                    isBefore_1.default(user.forgotPasswordExpiry, new Date())) {
                    return [2 /*return*/, res.sendStatus(401)];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(req.body.token, user.forgotPasswordTokenHash)];
            case 5:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.sendStatus(401)];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, 10)];
            case 6:
                passwordHash = _a.sent();
                return [4 /*yield*/, UserRepo_1.updateUser(user.id, { passwordHash: passwordHash, forgotPasswordExpiry: null, forgotPasswordTokenHash: null })];
            case 7:
                _a.sent();
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
exports.default = authRouter;
