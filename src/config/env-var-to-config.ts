const makeFilterPrefixedKeys = prefix => ([key, value]) =>
  key.startsWith(prefix);

const reduceEntriesToObject = (acc, [key, val]) => ({
  [key]: val,
  ...acc
});

const envVarToConfig = (prefix, envVars) => ({
  NODE_ENV: envVars.NODE_ENV,
  ...Object.entries(envVars)
    .filter(makeFilterPrefixedKeys(prefix))
    .reduce(reduceEntriesToObject, {})
});

export default envVarToConfig;
