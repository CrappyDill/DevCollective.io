"use strict";
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
var TestRepo_1 = require("../../dev/test/TestRepo");
var datasetLoader_1 = require("../../dev/test/datasetLoader");
var mail_1 = __importDefault(require("@sendgrid/mail"));
var UserRepo_1 = require("../data/UserRepo");
var uuid_1 = require("uuid");
var bcrypt_1 = __importDefault(require("bcrypt"));
var subDays_1 = __importDefault(require("date-fns/subDays"));
var addDays_1 = __importDefault(require("date-fns/addDays"));
var utils_1 = require("../test/utils");
// disable emails
jest.mock("@sendgrid/mail");
describe("Forgot Password", function () {
    var tm;
    var app;
    var data;
    var defaultPassword = "password";
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
        it("successfully sends a forgot password reset email", function () { return __awaiter(void 0, void 0, void 0, function () {
            var email, dbUser, dbUser, sentHtml, confirmationToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = utils_1.getDefaultUser(data).email;
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 1:
                        dbUser = _a.sent();
                        expect(dbUser.forgotPasswordTokenHash).toBeFalsy();
                        expect(dbUser.forgotPasswordExpiry).toBeFalsy();
                        return [4 /*yield*/, tm.forgotRequest(email).expect(200)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(email)];
                    case 3:
                        dbUser = _a.sent();
                        expect(dbUser.forgotPasswordTokenHash).toBeTruthy();
                        expect(dbUser.forgotPasswordExpiry).toBeTruthy();
                        // test that email was sent correctly
                        expect(mail_1.default.send).toHaveBeenCalledTimes(1);
                        sentHtml = utils_1.getSentEmail(mail_1.default);
                        confirmationToken = utils_1.extractUuidTokenFromEmail(sentHtml);
                        expect(confirmationToken).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("successfully resets a user's password with a good token.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var email, sentHtml, token, newPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = utils_1.getDefaultUser(data).email;
                        return [4 /*yield*/, tm.login(email, defaultPassword).expect(200)];
                    case 1:
                        _a.sent();
                        // check that i cannot log in with new password
                        return [4 /*yield*/, tm.login("bademail@email.com", "somepassword")];
                    case 2:
                        // check that i cannot log in with new password
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest(email).expect(200)];
                    case 3:
                        _a.sent();
                        sentHtml = utils_1.getSentEmail(mail_1.default);
                        expect(sentHtml).toBeTruthy();
                        token = utils_1.extractUuidTokenFromEmail(sentHtml);
                        newPassword = "thisisanewpassword";
                        return [4 /*yield*/, tm.forgotConfirm({ email: email, token: token, password: newPassword }).expect(200)];
                    case 4:
                        _a.sent();
                        // check that i cannot log in with existing password
                        return [4 /*yield*/, tm.login(email, defaultPassword).expect(401)];
                    case 5:
                        // check that i cannot log in with existing password
                        _a.sent();
                        // check that i can log in with new password
                        return [4 /*yield*/, tm.login(email, newPassword)];
                    case 6:
                        // check that i can log in with new password
                        _a.sent();
                        // check that i cannot use the same token to reset again
                        return [4 /*yield*/, tm.forgotConfirm({ email: email, token: token, password: newPassword }).expect(401)];
                    case 7:
                        // check that i cannot use the same token to reset again
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("rainy", function () {
        it("does not allow an expired token to be used.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = utils_1.getDefaultUser(data);
                        token = uuid_1.v4();
                        return [4 /*yield*/, bcrypt_1.default.hash(token, 10)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, UserRepo_1.updateUser(user.id, {
                                forgotPasswordTokenHash: hash,
                                forgotPasswordExpiry: subDays_1.default(new Date(), 1),
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotConfirm({ email: user.email, token: token, password: "someNewPassword" }).expect(401)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("only allows a token to be used once.", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, token, hash, newPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = utils_1.getDefaultUser(data);
                        token = uuid_1.v4();
                        return [4 /*yield*/, bcrypt_1.default.hash(token, 10)];
                    case 1:
                        hash = _a.sent();
                        return [4 /*yield*/, UserRepo_1.updateUser(user.id, {
                                forgotPasswordTokenHash: hash,
                                forgotPasswordExpiry: addDays_1.default(new Date(), 1),
                            })];
                    case 2:
                        _a.sent();
                        newPassword = "someNewPassword";
                        // confirm that login works with old password
                        return [4 /*yield*/, tm.login(user.email, defaultPassword).expect(200)];
                    case 3:
                        // confirm that login works with old password
                        _a.sent();
                        // change the password
                        return [4 /*yield*/, tm.forgotConfirm({ email: user.email, token: token, password: newPassword }).expect(200)];
                    case 4:
                        // change the password
                        _a.sent();
                        // old password no longer works
                        return [4 /*yield*/, tm.login(user.email, defaultPassword).expect(401)];
                    case 5:
                        // old password no longer works
                        _a.sent();
                        // new password works
                        return [4 /*yield*/, tm.login(user.email, newPassword).expect(200)];
                    case 6:
                        // new password works
                        _a.sent();
                        // old token no longer resets the password
                        return [4 /*yield*/, tm.forgotConfirm({ email: user.email, token: token, password: "someNewPassword" }).expect(401)];
                    case 7:
                        // old token no longer resets the password
                        _a.sent();
                        // confirm old password still does not work
                        return [4 /*yield*/, tm.login(user.email, defaultPassword).expect(401)];
                    case 8:
                        // confirm old password still does not work
                        _a.sent();
                        // confirm new password still works.
                        return [4 /*yield*/, tm.login(user.email, newPassword).expect(200)];
                    case 9:
                        // confirm new password still works.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("fails bad request when no email is sent, or when a bad email is sent", function () { return __awaiter(void 0, void 0, void 0, function () {
            var forgotPasswordUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        forgotPasswordUrl = "/auth/forgot/request";
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl).expect(400)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, { email: null }).expect(400)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, { email: undefined }).expect(400)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, { email: true }).expect(400)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, { email: false }).expect(400)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, 0).expect(400)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, 1).expect(400)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, { email: "lol" }).expect(400)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, {}).expect(400)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, tm.raw().post(forgotPasswordUrl, { email: "good@email.com", other: "some-unexpected-data" }).expect(400)];
                    case 10:
                        _a.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("validates email", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // test bad emails
                    return [4 /*yield*/, tm.forgotRequest("bademail").expect(400)];
                    case 1:
                        // test bad emails
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("bademail@").expect(400)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("bademail.com").expect(400)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("@bademail.com").expect(400)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest(" @bademail.com").expect(400)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("bademail@something").expect(400)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest(" bademail@something").expect(400)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("bademail@something ").expect(400)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("bademail ").expect(400)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("lol@bademail .com").expect(400)];
                    case 10:
                        _a.sent();
                        // capitals
                        return [4 /*yield*/, tm.forgotRequest("UPPERCASE@EMAIL.COM").expect(400)];
                    case 11:
                        // capitals
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("lowerCamel@email.com").expect(400)];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("UpperCamel@email.com").expect(400)];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("user@EMAIL.com").expect(400)];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, tm.forgotRequest("user@email.COM").expect(400)];
                    case 15:
                        _a.sent();
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should send a 200 and do nothing when the email does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
            var badEmail, dbUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        badEmail = "doesnotexist@email.com";
                        return [4 /*yield*/, UserRepo_1.getUserByEmail(badEmail)];
                    case 1:
                        dbUser = _a.sent();
                        expect(dbUser).toBeFalsy();
                        // request should still look like it succeeded
                        return [4 /*yield*/, tm.forgotRequest(badEmail).expect(200)];
                    case 2:
                        // request should still look like it succeeded
                        _a.sent();
                        // no email should have been sent
                        expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
