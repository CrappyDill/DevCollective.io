"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.default = {
    client: "postgresql",
    connection: {
        database: "mintbean_v4_test",
        user: "postgres",
        password: "postgres",
        port: 10801,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations_test",
        directory: path_1.default.join(__dirname, "../../src/data/migrations"),
    },
    seeds: {
        directory: "seeds-are-disabled",
    },
};
