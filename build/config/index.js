"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const fs = require("fs");
// @TODO: Fix any!
const envVarToConfig = (prefix, envVars) => (Object.assign({ NODE_ENV: envVars.NODE_ENV }, Object.entries(envVars).reduce((acc, [key, val]) => {
    return key.startsWith(prefix) ? Object.assign({ [key]: envVars[key] }, acc) : acc;
}, {})));
// @TODO: Fix any!
exports.default = (props) => {
    dotenv.config();
    const { prefix, envVars } = props;
    const config = envVarToConfig(prefix, envVars);
    const mandatoryKeys = fs
        .readFileSync(__dirname + "/../../.env.example", "UTF-8")
        .split("\r\n")
        .filter(s => s)
        .map(s => s.split("=")[0]);
    const missingKeys = mandatoryKeys.reduce((acc, key) => config[key] !== undefined ? acc : acc.concat([key]), []);
    if (missingKeys.length > 0) {
        throw new Error(`Missing these env vars in config: ${missingKeys}.`);
    }
    if (Object.keys(config).length !== mandatoryKeys.length) {
        throw new Error(`
      Config had ${Object.keys(config).length} keys.
      Mandatory key count is ${mandatoryKeys.length}.
      Count must match exactly.
    `);
    }
    return config;
};
