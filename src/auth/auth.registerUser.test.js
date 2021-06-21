"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var appFactory_1 = __importDefault(require("../appFactory"));
var TestManager_1 = __importDefault(require("../test/TestManager"));
var UserService_1 = require("../service/UserService");
var TestRepo_1 = require("../../dev/test/TestRepo");
var datasetLoader_1 = require("../../dev/test/datasetLoader");
var mail_1 = __importDefault(require("@sendgrid/mail"));
var UserRepo_1 = require("../data/UserRepo");
var uuid_1 = require("uuid");
var utils_1 = require("../test/utils");
// disable emails
jest.mock("@sendgrid/mail");
describe("Authentication", function () {
    var tm;
    var app;
    var data;
    var newUser = { firstName: "New", lastName: "User", email: "new@user.com", password: "newpassword" };
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TestRepo_1.clearDatabase()];
                case 1:
                    _a.sent();
                    app = appFactory_1.default();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () {
        jest.clearAllMocks();
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, datasetLoader_1.datasetLoader()];
                case 1:
                    data = _a.sent();
                    tm = new TestManager_1.default(app);
                    return [2 /*return*/];
            }
        });
    }); });
    describe("sunny", function () {
        it("can register a new user", function () { return __awaiter(void 0, void 0, void 0, function () {
            var registerResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.register({
                            firstName: "New",
                            lastName: "User",
                            email: "new@user.com",
                            password: "newpassword",
                        })];
                    case 1:
                        registerResponse = _a.sent();
                        expect(registerResponse.statusCode).toBe(200);
                        expect(registerResponse.body.id).toBeTruthy();
                        expect(registerResponse.body.createdAt).toBeTruthy();
                        expect(registerResponse.body.firstName).toBe(newUser.firstName);
                        expect(registerResponse.body.lastName).toBe(newUser.lastName);
                        expect(registerResponse.body.email).toBe(newUser.email);
                        expect(registerResponse.body.password).toBeFalsy();
                        expect(registerResponse.body.passwordHash).toBeFalsy();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Successfully sets a confirmation token in the db.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, dbUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.register({
                            firstName: "New",
                            lastName: "User",
                            email: "new@user.com",
                            password: "newpassword",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        return [4 /*yield*/, UserRepo_1.getUserById(response.body.id)];
                    case 2:
                        dbUser = _a.sent();
                        expect(dbUser.id).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Successfully sends an email with a password confirmation token.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, sentHtml, confirmationToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.register({
                            firstName: "New",
                            lastName: "User",
                            email: "new@user.com",
                            password: "newpassword",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(200);
                        sentHtml = utils_1.getSentEmail(mail_1.default);
                        confirmationToken = utils_1.extractUuidTokenFromEmail(sentHtml);
                        expect(confirmationToken).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("validations", function () {
        it("validates email", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: null })).expect(400)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: undefined })).expect(400)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: 0 })).expect(400)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: 1 })).expect(400)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: { email: "lol" } })).expect(400)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: {} })).expect(400)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "bademail" })).expect(400)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "bademail@" })).expect(400)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "bademail.com" })).expect(400)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "@bademail.com" })).expect(400)];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: " @bademail.com" })).expect(400)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "bademail@something" })).expect(400)];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: " bademail@something" })).expect(400)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "bademail@something " })).expect(400)];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "bademail " })).expect(400)];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "lol@bademail .com" })).expect(400)];
                    case 16:
                        _a.sent();
                        // lowercase only
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "UPPERCASE@EMAIL.COM" })).expect(400)];
                    case 17:
                        // lowercase only
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "lowerCamel@email.com" })).expect(400)];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "UpperCamel@email.com" })).expect(400)];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "user@EMAIL.com" })).expect(400)];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { email: "user@email.COM" })).expect(400)];
                    case 21:
                        _a.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("requires a password of at least 8 characters in length.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: undefined })).expect(400)];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: null })).expect(400)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: {} })).expect(400)];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: { password: "lol" } })).expect(400)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: { password: null } })).expect(400)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "" })).expect(400)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "t" })).expect(400)];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "to" })).expect(400)];
                    case 8:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "too" })).expect(400)];
                    case 9:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "toos" })).expect(400)];
                    case 10:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "toosh" })).expect(400)];
                    case 11:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "toosho" })).expect(400)];
                    case 12:
                        _c.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "tooshor" })).expect(400)];
                    case 13:
                        _c.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        _a = expect;
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(newUser.email)];
                    case 14:
                        _a.apply(void 0, [_c.sent()]).toBeFalsy();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { password: "NOTshort" })).expect(200)];
                    case 15:
                        _c.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(1);
                        _b = expect;
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(newUser.email)];
                    case 16:
                        _b.apply(void 0, [_c.sent()]).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("requires a first name", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { firstName: undefined })).expect(400)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { firstName: null })).expect(400)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { firstName: {} })).expect(400)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { firstName: { firstName: "lol" } })).expect(400)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { firstName: { firstName: null } })).expect(400)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { firstName: "" })).expect(400)];
                    case 6:
                        _a.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("requires a last name", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { lastName: undefined })).expect(400)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { lastName: null })).expect(400)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { lastName: {} })).expect(400)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { lastName: { lastName: "lol" } })).expect(400)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { lastName: { lastName: null } })).expect(400)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, tm.register(__assign(__assign({}, newUser), { lastName: "" })).expect(400)];
                    case 6:
                        _a.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("behaviour", function () {
        it("correctly performs accountConfirmation flag behaviour", function () { return __awaiter(void 0, void 0, void 0, function () {
            var confirmationToken, email, password, userNotYetCreated, createdUser, loginResponse, checkResponse1, confirmationResponse, checkResponse2, createdUser2, tm2, loginResponse2, checkResponse3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmationToken = "9123f99b-e69b-4816-8e27-536856162f26";
                        email = "new@user.com";
                        password = "password";
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 1:
                        userNotYetCreated = _a.sent();
                        expect(userNotYetCreated).toBeFalsy();
                        // create the user
                        return [4 /*yield*/, UserService_1.createUser({
                                email: email,
                                firstName: "new",
                                lastName: "user",
                                password: password,
                                confirmationToken: confirmationToken,
                            })];
                    case 2:
                        // create the user
                        _a.sent();
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 3:
                        createdUser = _a.sent();
                        expect(createdUser).toBeTruthy();
                        expect(createdUser.confirmationTokenHash).toBeTruthy();
                        return [4 /*yield*/, tm.login(createdUser.email, password)];
                    case 4:
                        loginResponse = _a.sent();
                        expect(loginResponse.statusCode).toBe(200);
                        expect(loginResponse.body.accountConfirmationPending).toBeTruthy();
                        return [4 /*yield*/, tm.check()];
                    case 5:
                        checkResponse1 = _a.sent();
                        expect(checkResponse1.body.accountConfirmationPending).toBeTruthy();
                        return [4 /*yield*/, tm.submitAccountConfirmationToken({ confirmationToken: confirmationToken, email: email })];
                    case 6:
                        confirmationResponse = _a.sent();
                        expect(confirmationResponse.statusCode).toBe(200);
                        return [4 /*yield*/, tm.check()];
                    case 7:
                        checkResponse2 = _a.sent();
                        expect(checkResponse2.body.accountConfirmationPending).toBeTruthy();
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 8:
                        createdUser2 = _a.sent();
                        expect(createdUser2).toBeTruthy();
                        expect(createdUser2.id).toEqual(createdUser.id);
                        expect(createdUser2.confirmationTokenHash).toBeFalsy();
                        tm2 = tm.fork();
                        return [4 /*yield*/, tm2.login(email, password).expect(200)];
                    case 9:
                        loginResponse2 = _a.sent();
                        expect(loginResponse2.body.accountConfirmationPending).toBeFalsy();
                        return [4 /*yield*/, tm2.check()];
                    case 10:
                        checkResponse3 = _a.sent();
                        expect(checkResponse3.body.accountConfirmationPending).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Successfully confirms an account with a confirmationToken", function () { return __awaiter(void 0, void 0, void 0, function () {
            var confirmationToken, email, userNotYetCreated, createdUser, confirmationResponse, createdUser2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmationToken = "9123f99b-e69b-4816-8e27-536856162f26";
                        email = "new@user.com";
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 1:
                        userNotYetCreated = _a.sent();
                        expect(userNotYetCreated).toBeFalsy();
                        // create the user
                        return [4 /*yield*/, UserService_1.createUser({
                                email: email,
                                firstName: "new",
                                lastName: "user",
                                password: "password",
                                confirmationToken: confirmationToken,
                            })];
                    case 2:
                        // create the user
                        _a.sent();
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 3:
                        createdUser = _a.sent();
                        expect(createdUser).toBeTruthy();
                        expect(createdUser.confirmationTokenHash).toBeTruthy();
                        return [4 /*yield*/, tm.submitAccountConfirmationToken({ confirmationToken: confirmationToken, email: email })];
                    case 4:
                        confirmationResponse = _a.sent();
                        expect(confirmationResponse.statusCode).toBe(200);
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 5:
                        createdUser2 = _a.sent();
                        expect(createdUser2).toBeTruthy();
                        expect(createdUser2.id).toEqual(createdUser.id);
                        expect(createdUser2.confirmationTokenHash).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("rainy", function () {
        it("fails account confirmation if confirmationToken not in query param.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.submitAccountConfirmationToken({
                            confirmationToken: undefined,
                            email: "user@user.com",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it("fails account confirmation if confirmationToken is not uuid", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.submitAccountConfirmationToken({
                            confirmationToken: "not-uuid",
                            email: "user@user.com",
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.body.errors.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("fails account confirmation if an email is not in the query param.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.submitAccountConfirmationToken({
                            email: undefined,
                            confirmationToken: uuid_1.v4(),
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(400);
                        expect(response.body.errors.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("fails account confirmation if email string is not email format.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tm.submitAccountConfirmationToken({
                            email: "not-email",
                            confirmationToken: uuid_1.v4(),
                        })];
                    case 1:
                        response = _a.sent();
                        expect(response.statusCode).toBe(400);
                        expect(response.body.errors.length).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("will not confirm an account that has no confirmationToken in the database", function () { return __awaiter(void 0, void 0, void 0, function () {
            var confirmationToken, email, userNotYetCreated, createdUser, confirmationResponse, createdUser2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmationToken = "9123f99b-e69b-4816-8e27-536856162f26";
                        email = "new@user.com";
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 1:
                        userNotYetCreated = _a.sent();
                        expect(userNotYetCreated).toBeFalsy();
                        // create the user
                        return [4 /*yield*/, UserService_1.createUser({
                                email: email,
                                firstName: "new",
                                lastName: "user",
                                password: "password",
                                confirmationToken: undefined,
                            })];
                    case 2:
                        // create the user
                        _a.sent();
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 3:
                        createdUser = _a.sent();
                        expect(createdUser).toBeTruthy();
                        expect(createdUser.confirmationTokenHash).toBeFalsy();
                        return [4 /*yield*/, tm.submitAccountConfirmationToken({ confirmationToken: confirmationToken, email: email })];
                    case 4:
                        confirmationResponse = _a.sent();
                        expect(confirmationResponse.statusCode).toBe(409);
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 5:
                        createdUser2 = _a.sent();
                        expect(createdUser2).toBeTruthy();
                        expect(createdUser2.confirmationTokenHash).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("will not confirm an account that does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var confirmationToken, email, userNotYetCreated, confirmationResponse, userNotYetCreated2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmationToken = "9123f99b-e69b-4816-8e27-536856162f26";
                        email = "new@user.com";
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 1:
                        userNotYetCreated = _a.sent();
                        expect(userNotYetCreated).toBeFalsy();
                        return [4 /*yield*/, tm.submitAccountConfirmationToken({ confirmationToken: confirmationToken, email: email })];
                    case 2:
                        confirmationResponse = _a.sent();
                        expect(confirmationResponse.statusCode).toBe(400);
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 3:
                        userNotYetCreated2 = _a.sent();
                        expect(userNotYetCreated2).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
