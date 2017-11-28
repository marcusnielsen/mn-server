import { makeConfig } from '../config'
import { makeConnectors } from '../connectors'

test('makeConnectors', () => {
  const config: any = makeConfig({
    envVars: process.env,
    noneString: '__NONE__',
    prefix: 'MN_',
  })
  const { dbConnector } = makeConnectors(config)

  const { endpoints, effect } = dbConnector

  return effect({
    data: null,
    endpoint: endpoints.users.getUsers,
  }).then(data => {
    expect(data).toEqual([
      { createdAt: '2017-11-27T22:55:20.551Z', email: 'mn@example.com', id: 1 },
      {
        createdAt: '2017-11-27T22:55:20.551Z',
        email: 'mn2@example.com',
        id: 2,
      },
      {
        createdAt: '2017-11-27T22:55:20.551Z',
        email: 'mn3@example.com',
        id: 3,
      },
    ])
  })
})
