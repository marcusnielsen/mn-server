import { makeConfig } from '../config'
import { makeConnectors } from '../connectors'

test('makeConnectors', () => {
  const config: any = makeConfig({
    envVars: process.env,
    noneString: '__NONE__',
    prefix: 'MN_',
  })
  const { dbConnector } = makeConnectors(config)

  const { actions, endpoints, effect } = dbConnector

  effect({ endpoint: endpoints.users.root, action: actions.get, data: null })

  expect(true).toEqual(false)
})
