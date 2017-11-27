import { makeConfig } from '../config'

test('makeConfig', () => {
  const envVars = {
    MN_AMQP_CONNECTION: 'amqp',
    MN_DB_DATABASE: 'db database',
    MN_DB_HOST: 'db host',
    MN_DB_PASSWORD: '__NONE__',
    MN_DB_USER: 'db user',
    MN_SERVER_PORT: 'port',
    NODE_ENV: 'test',
    SKIPPED_KEY: 'skipped val',
  }

  const configProps = {
    envVars,
    noneString: '__NONE__',
    prefix: 'MN_',
  }

  const config = makeConfig(configProps)
  expect(config).toEqual({
    MN_AMQP_CONNECTION: 'amqp',
    MN_DB_DATABASE: 'db database',
    MN_DB_HOST: 'db host',
    MN_DB_PASSWORD: null,
    MN_DB_USER: 'db user',
    MN_SERVER_PORT: 'port',
    NODE_ENV: 'test',
  })
})
