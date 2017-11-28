import { endpoints } from './endpoints'
import { makeKnex } from './knex'

const makeEffect = knex => ({ endpoint, data }) =>
  endpoint({
    data,
    knex,
  })

export function makeDbConnector({ host, user, password, database }) {
  const knex = makeKnex({ host, user, password, database })

  return {
    effect: makeEffect(knex),
    endpoints,
  }
}
