"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const config_1 = require("./config");
const server_1 = require("./server");
const config = config_1.default({ prefix: "MN_", envVars: process.env });
const server = Express();
server_1.default({ config, server });
