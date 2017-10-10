import * as Express from "express";
import makeAmqp from "./amqp";
import makeConfig from "./config";
import runServer from "./server";

const config = makeConfig({ prefix: "MN_", envVars: process.env });
const amqp = makeAmqp(config);
const server = Express();

runServer({ config, server, amqp });
