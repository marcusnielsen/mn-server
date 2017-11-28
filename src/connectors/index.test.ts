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
    const emails = data.map(({ email }) => ({ email }))

    expect(emails).toEqual([
      { email: 'mn@example.com' },
      {
        email: 'mn2@example.com',
      },
      {
        email: 'mn3@example.com',
      },
    ])
  })
})
