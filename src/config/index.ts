// @TODO: Am I blind??
// Isn't typescript able to validate the envVars without me fidgeting around with dynamic validation??
// Be embarrassed for a while, and then refactor.

import * as dotenv from 'dotenv'
import { envVarToConfig } from './env-var-to-config'
import { readMandatoryEnvVarKeys } from './read-mandatory-keys'

const makeFilterMissingKeys = obj => key => !obj[key]

// All environment variables except NODE_MODULES should be prefixed by some unique string.
// This allows us to filter out not needed environment variables from the config object.
// Example prefix: "MN_" or "MYAPP_".
export const makeConfig = props => {
  dotenv.config()
  const { prefix, noneString, envVars } = props
  const configWithNoneStrings = envVarToConfig({ prefix, noneString, envVars })
  const mandatoryKeys = readMandatoryEnvVarKeys()
  const missingKeys = mandatoryKeys.filter(
    makeFilterMissingKeys(configWithNoneStrings)
  )
  const mandatoryKeyMissing = missingKeys.length > 0
  const envVarKeysTooMany =
    Object.keys(configWithNoneStrings).length > mandatoryKeys.length

  if (mandatoryKeyMissing) {
    throw new Error(`Missing these env vars in config: ${missingKeys}.`)
  }

  if (envVarKeysTooMany) {
    throw new Error(`
      Config key count is ${Object.keys(configWithNoneStrings).length}.
      Mandatory key count is ${mandatoryKeys.length}.
      Config should not provide unused keys.
      Check your environment variables for any unused keys.
    `)
  }

  const config = Object.entries(configWithNoneStrings).reduce(
    (acc, [key, val]) => ({ ...acc, [key]: val === noneString ? null : val }),
    {}
  )

  return config
}
