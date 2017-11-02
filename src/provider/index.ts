import * as Express from 'express'
import makeAmqp from '../amqp'
import { makeConfig } from '../config'
import { makeDb } from '../db'
import { makeGraphqlServer } from '../graphql-server'

export const makeProvider = ({ envVars }) => {
  const config = makeConfig({ prefix: 'MN_', noneString: '__NONE__', envVars })
  const amqp = makeAmqp(config)
  const server = Express()
  makeDb({
    database: config.MN_DB_DATABASE,
    host: config.MN_DB_HOST,
    password: config.MN_DB_PASSWORD === '__NONE__' ? '' : config.MN_DB_PASSWORD,
    user: config.MN_DB_USER,
  })
  makeGraphqlServer({ server })

  const run = () => {
    server.listen(config.MN_SERVER_PORT)
    // runServer({ config, server, amqp })
  }

  return {
    amqp,
    config,
    run,
    server,
  }
}
