import * as makeKnexConnection from 'knex'
import * as path from 'path'

export function makeKnex({ host, user, password, database }) {
  const knex = makeKnexConnection({
    client: 'pg',
    connection: {
      database,
      host,
      password: 'postgres',
      user,
    },
  })

  // @TODO: Figure out how to make this work with async await or Promises.
  // @TODO: See why migrations bugs out in tests.
  if (process.env.NODE_ENV !== 'test') {
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() =>
        knex.seed
          .run()
          .then(() => knex)
          // tslint:disable-next-line:no-console
          .catch(e => console.error(e) && process.exit(1))
      )
  }

  return knex
}
