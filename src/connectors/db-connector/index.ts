import { makeKnex } from './knex'

const getUsers = ({ knex, data }) =>
  knex.raw('SELECT * FROM users').then(({ rows }) =>
    rows.map(({ id, created_at, email }) => ({
      createdAt: new Date(created_at).toISOString(),
      email,
      id,
    }))
  )

const getUserProfile = ({ knex, data }) =>
  knex
    .raw('SELECT * FROM users WHERE id = ?', [data.id])
    .then(({ rows }) =>
      rows.map(({ id, created_at, email }) => ({
        createdAt: new Date(created_at).toISOString(),
        email,
        id,
      }))
    )
    .then(rows => rows[0])

const endpoints = {
  users: {
    getUserProfile: 'get users/profile',
    getUsers: 'get users',
  },
}

const effectExecutors = {
  [endpoints.users.getUserProfile]: getUserProfile,
  [endpoints.users.getUsers]: getUsers,
}

const makeEffect = knex => ({ endpoint, data }) =>
  effectExecutors[endpoint]({
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
