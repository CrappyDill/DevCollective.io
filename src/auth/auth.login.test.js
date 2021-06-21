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
var utils_1 = require("../test/utils");
// disable emails
jest.mock("@sendgrid/mail");
describe("Authentication", function () {
    var tm;
    var app;
    var data;
    var defaultPassword = "password";
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
    describe("Login", function () {
        describe("sunny", function () {
            it("can log in", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, firstName, lastName, email, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = utils_1.getDefaultUser(data), firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
                            return [4 /*yield*/, tm.login(email, defaultPassword).expect(200)];
                        case 1:
                            response = _b.sent();
                            expect(response.body).toMatchObject({
                                email: email,
                                firstName: firstName,
                                lastName: lastName,
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
            it("does not send back password or passwordHash", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, firstName, lastName, email, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = utils_1.getDefaultUser(data), firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
                            return [4 /*yield*/, tm.login(email, defaultPassword).expect(200)];
                        case 1:
                            response = _b.sent();
                            expect(response.body.password).toBeFalsy();
                            expect(response.body.passwordHash).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("can perform a full login flow", function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, firstName, lastName, email, loginResponse, checkResponse, checkResponseAfterLogout;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, tm.check().expect(401)];
                        case 1:
                            _b.sent();
                            _a = utils_1.getDefaultUser(data), firstName = _a.firstName, lastName = _a.lastName, email = _a.email;
                            return [4 /*yield*/, tm.login(email, defaultPassword).expect(200)];
                        case 2:
                            loginResponse = _b.sent();
                            expect(loginResponse.body).toMatchObject({ firstName: firstName, lastName: lastName, email: email });
                            return [4 /*yield*/, tm.check().expect(200)];
                        case 3:
                            checkResponse = _b.sent();
                            expect(checkResponse.body).toMatchObject({ firstName: firstName, lastName: lastName, email: email });
                            return [4 /*yield*/, tm.logout().expect(200)];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, tm.check().expect(401)];
                        case 5:
                            checkResponseAfterLogout = _b.sent();
                            expect(checkResponseAfterLogout.body).toMatchObject({});
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("rainy", function () {
            it("can't log in with the wrong password", function () { return __awaiter(void 0, void 0, void 0, function () {
                var email;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = utils_1.getDefaultUser(data).email;
                            return [4 /*yield*/, tm.login(email, "wrongpassword").expect(401)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("can't log in with the wrong email", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tm.login("wrongemail@test.com", defaultPassword).expect(401)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it("can't log in with the wrong email and wrong password", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tm.login("wrongemail@test.com", "wrongpassword").expect(401)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe("validations", function () {
            it("validates email", function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tm.login(null, defaultPassword).expect(400)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, tm.login(undefined, defaultPassword).expect(400)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, tm.login(0, defaultPassword).expect(400)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, tm.login(1, defaultPassword).expect(400)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, tm.login({ email: "lol" }, defaultPassword).expect(400)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, tm.login({}, defaultPassword).expect(400)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, tm.login("bademail", defaultPassword).expect(400)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, tm.login("bademail@", defaultPassword).expect(400)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, tm.login("bademail.com", defaultPassword).expect(400)];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, tm.login("@bademail.com", defaultPassword).expect(400)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, tm.login(" @bademail.com", defaultPassword).expect(400)];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, tm.login("bademail@something", defaultPassword).expect(400)];
                        case 12:
                            _a.sent();
                            return [4 /*yield*/, tm.login(" bademail@something", defaultPassword).expect(400)];
                        case 13:
                            _a.sent();
                            return [4 /*yield*/, tm.login("bademail@something ", defaultPassword).expect(400)];
                        case 14:
                            _a.sent();
                            return [4 /*yield*/, tm.login("bademail ", defaultPassword).expect(400)];
                        case 15:
                            _a.sent();
                            return [4 /*yield*/, tm.login("lol@bademail .com", defaultPassword).expect(400)];
                        case 16:
                            _a.sent();
                            // capitals
                            return [4 /*yield*/, tm.login("UPPERCASE@EMAIL.COM", defaultPassword).expect(400)];
                        case 17:
                            // capitals
                            _a.sent();
                            return [4 /*yield*/, tm.login("lowerCamel@email.com", defaultPassword).expect(400)];
                        case 18:
                            _a.sent();
                            return [4 /*yield*/, tm.login("UpperCamel@email.com", defaultPassword).expect(400)];
                        case 19:
                            _a.sent();
                            return [4 /*yield*/, tm.login("user@EMAIL.com", defaultPassword).expect(400)];
                        case 20:
                            _a.sent();
                            return [4 /*yield*/, tm.login("user@email.COM", defaultPassword).expect(400)];
                        case 21:
                            _a.sent();
                            expect(mail_1.default.send).toHaveBeenCalledTimes(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("requires a password of at least 8 characters in length.", function () { return __awaiter(void 0, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            user = newUser;
                            return [4 /*yield*/, tm.login(user.email, undefined).expect(400)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, null).expect(400)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, {}).expect(400)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "lol").expect(400)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, null).expect(400)];
                        case 5:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "").expect(400)];
                        case 6:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "t").expect(400)];
                        case 7:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "to").expect(400)];
                        case 8:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "too").expect(400)];
                        case 9:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "toos").expect(400)];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "toosh").expect(400)];
                        case 11:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "toosho").expect(400)];
                        case 12:
                            _a.sent();
                            return [4 /*yield*/, tm.login(user.email, "tooshor").expect(400)];
                        case 13:
                            _a.sent();
                            // the next one has the right length. but again, it's not a valid user email...
                            // so we expect a 401 instead of a 400.
                            return [4 /*yield*/, tm.login(user.email, "NOTshort").expect(401)];
                        case 14:
                            // the next one has the right length. but again, it's not a valid user email...
                            // so we expect a 401 instead of a 400.
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
