const makeFilterPrefixedKeys = prefix => ([key]) => key.startsWith(prefix)

const reduceEntriesToObject = (acc, [key, val]) => ({
  [key]: val,
  ...acc,
})

export const envVarToConfig = ({ prefix, noneString, envVars }) => ({
  NODE_ENV: envVars.NODE_ENV,
  ...Object.entries(envVars)
    .filter(makeFilterPrefixedKeys(prefix))
    .reduce(reduceEntriesToObject, {}),
})
