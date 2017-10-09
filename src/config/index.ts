import * as dotenv from "dotenv";
import * as fs from "fs";

// @TODO: Fix any!
const envVarToConfig = (prefix: string, envVars: any) => ({
  NODE_ENV: envVars.NODE_ENV,
  ...Object.entries(
    envVars
  ).reduce((acc: any, [key, val]: [string, string]) => {
    return key.startsWith(prefix) ? { [key]: envVars[key], ...acc } : acc;
  }, {})
});

// @TODO: Fix any!
export default (props: { prefix: string; envVars: any }) => {
  dotenv.config();
  const { prefix, envVars } = props;

  const config = envVarToConfig(prefix, envVars);
  const mandatoryKeys = fs
    .readFileSync(__dirname + "/../../.env.example", "UTF-8")
    .split("\r\n")
    .filter(s => s)
    .map(s => s.split("=")[0]);

  const missingKeys = mandatoryKeys.reduce(
    (acc: [string], key) =>
      config[key] !== undefined ? acc : acc.concat([key]),
    []
  );

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
