import * as makeKnex from 'knex'
import * as path from 'path'

export const makeDb = ({ host, user, password, database }) => {
  const knex = makeKnex({
    client: 'pg',
    connection: {
      database,
      host,
      password: 'postgres',
      user,
    },
  })

  return (
    knex.migrate
      .rollback()
      .then(() => {
        knex.migrate.latest().then(() => {
          return knex.seed.run()
        })
      })
      // tslint:disable-next-line:no-console
      .catch(e => console.error(e) && process.exit(1))
  )
}
