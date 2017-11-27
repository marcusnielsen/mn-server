import * as Express from 'express'
import makeAmqp from '../amqp'
import { makeConfig } from '../config'
import { makeConnectors } from '../connectors'
import { makeGraphqlServer } from '../graphql-server'

export const makeProvider = ({ envVars }) => {
  const config: any = makeConfig({
    envVars,
    noneString: '__NONE__',
    prefix: 'MN_',
  })
  const amqp = makeAmqp(config)
  const server = Express()

  const connectors = makeConnectors(config)
  makeGraphqlServer({ connectors, server })

  const run = () => {
    server.listen(config.MN_SERVER_PORT)
  }

  return {
    amqp,
    config,
    run,
    server,
  }
}
