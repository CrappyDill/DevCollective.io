"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __importDefault(require("./query"));
var TestManager = /** @class */ (function () {
    function TestManager(app) {
        this.app = app;
        this.agent = query_1.default(this.app);
    }
    TestManager.prototype.login = function (email, password, agent) {
        if (agent === void 0) { agent = this.agent; }
        return agent.post("/auth/login", {
            email: email,
            password: password,
        });
    };
    // these are "any" type to accommodate various bad data in some of the tests
    TestManager.prototype.register = function (opts, agent) {
        if (agent === void 0) { agent = this.agent; }
        var firstName = opts.firstName, lastName = opts.lastName, email = opts.email, password = opts.password;
        return agent.post("/auth/register", {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });
    };
    TestManager.prototype.submitAccountConfirmationToken = function (opts, agent) {
        if (agent === void 0) { agent = this.agent; }
        var confirmationToken = opts.confirmationToken, email = opts.email;
        return agent.get("/auth/confirmAccount").query({ confirm: confirmationToken, email: email });
    };
    TestManager.prototype.forgotRequest = function (email, agent) {
        if (agent === void 0) { agent = this.agent; }
        return agent.post("/auth/forgot/request", { email: email });
    };
    TestManager.prototype.forgotConfirm = function (payload, agent) {
        if (agent === void 0) { agent = this.agent; }
        return agent.post("/auth/forgot/confirm", payload);
    };
    TestManager.prototype.check = function (agent) {
        if (agent === void 0) { agent = this.agent; }
        return agent.post("/auth/check");
    };
    TestManager.prototype.logout = function (agent) {
        if (agent === void 0) { agent = this.agent; }
        return agent.post("/auth/logout");
    };
    TestManager.prototype.raw = function () {
        return this.agent;
    };
    TestManager.prototype.fork = function () {
        return new TestManager(this.app);
    };
    TestManager.prototype.gql = function (query, variables, agent) {
        if (agent === void 0) { agent = this.agent; }
        return agent.post("/graphql", { query: query, variables: variables });
    };
    return TestManager;
}());
exports.default = TestManager;
