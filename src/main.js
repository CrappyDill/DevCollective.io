"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var appFactory_1 = __importDefault(require("./appFactory"));
var frontendDevMiddleware_1 = __importDefault(require("./frontend/frontendDevMiddleware"));
var app = appFactory_1.default();
frontendDevMiddleware_1.default(app);
var server = app.listen(8080, function () {
    var _a;
    var port = (_a = server.address()) === null || _a === void 0 ? void 0 : _a.port;
    console.log("Started on port " + port);
});
