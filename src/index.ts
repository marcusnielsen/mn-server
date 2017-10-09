import * as Express from "express";
import makeConfig from "./config";
import runServer from "./server";

const config = makeConfig({ prefix: "MN_", envVars: process.env });
const server = Express();

runServer({ config, server });
