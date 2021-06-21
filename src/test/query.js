"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var query = function (app) {
    var agent = supertest_1.default.agent(app);
    return {
        gqlQuery: function (query, variables) {
            var postData = {
                query: query,
                variables: variables,
            };
            return agent.post("/graphql").set("Accept", "application/json").send(postData);
        },
        gqlMutation: function (mutation, variables) {
            var postData = {
                query: mutation,
                variables: variables,
            };
            return agent.post("/graphql").set("Accept", "application/json").send(postData);
        },
        post: function (route, payload) {
            var request = agent
                .post(route)
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .send(payload);
            if (payload) {
                request = request.set("Content-Type", "application/json").send(payload);
            }
            else {
                request = request.send();
            }
            return request;
        },
        get: function (route, query) {
            return agent.get(route).query(query).set("Accept", "application/json").send();
        },
    };
};
exports.default = query;
