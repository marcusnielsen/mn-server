import * as fs from 'fs'
import { EOL } from 'os'
import { resolve } from 'path'

const mandatoryEnvVarsFile = __dirname + '/../../.env.example'
const filterNonEmptyStrings = str => str

const pickEnvVarKey = str => str.split('=')[0]

// All mandatory keys should be listed in the .env.example file
export const readMandatoryEnvVarKeys = () =>
  fs
    .readFileSync(mandatoryEnvVarsFile, 'UTF-8')
    .split(EOL)
    .filter(filterNonEmptyStrings)
    .map(pickEnvVarKey)
