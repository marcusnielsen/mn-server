import { makeDbConnector } from './db-connector'

export const makeConnectors = config => {
  const dbProps = {
    database: config.MN_DB_DATABASE,
    host: config.MN_DB_HOST,
    password: config.MN_DB_PASSWORD,
    user: config.MN_DB_USER,
  }
  return {
    dbConnector: makeDbConnector(dbProps),
  }
}
