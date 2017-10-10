// @TODO: Am I blind??
// Isn't typescript able to validate the envVars without me fidgeting around with dynamic validation??
// Be embarrassed for a while, and then refactor.

import * as dotenv from "dotenv";
import envVarToConfig from "./env-var-to-config";
import readMandatoryKeys from "./read-mandatory-keys";

const makeFilterMissingKeys = obj => key => !obj[key];

// All environment variables except NODE_MODULES should be prefixed by some unique string.
// This allows us to filter out not needed environment variables from the config object.
// Example prefix: "MN_" or "MYAPP_".
export default props => {
  dotenv.config();
  const { prefix, envVars } = props;
  const config = envVarToConfig(prefix, envVars);
  const mandatoryKeys = readMandatoryKeys();
  const missingKeys = mandatoryKeys.filter(makeFilterMissingKeys(config));
  const mandatoryKeyMissing = missingKeys.length > 0;
  const envVarKeysTooMany = Object.keys(config).length > mandatoryKeys.length;

  if (mandatoryKeyMissing) {
    throw new Error(`Missing these env vars in config: ${missingKeys}.`);
  }

  if (envVarKeysTooMany) {
    throw new Error(`
      Config key count is ${Object.keys(config).length}.
      Mandatory key count is ${mandatoryKeys.length}.
      Config should not provide unused keys.
      Check your environment variables for any unused keys.
    `);
  }

  return config;
};
