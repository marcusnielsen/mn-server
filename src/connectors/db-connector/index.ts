import { makeKnex } from './knex'

const createUser = ({ knex, data }) =>
  knex
    .raw('INSERT INTO users (email) VALUES(?)', data.email)
    .then(() => getUserProfileByEmail({ knex, data }))

const getUsers = ({ knex, data }) =>
  knex.raw('SELECT * FROM users').then(({ rows }) =>
    rows.map(({ id, created_at, email }) => ({
      createdAt: new Date(created_at).toISOString(),
      email,
      id,
    }))
  )

const getUserProfileByEmail = ({ knex, data }) =>
  knex
    .raw('SELECT * FROM users WHERE email = ?', data.email)
    .then(({ rows }) =>
      rows.map(({ id, created_at, email }) => ({
        createdAt: new Date(created_at).toISOString(),
        email,
        id,
      }))
    )
    .then(rows => rows[0])

const getUserProfile = ({ knex, data }) =>
  knex
    .raw('SELECT * FROM users WHERE id = ?', data.id)
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
    createUser: 'create users',
    getUserProfile: 'get users/profile',
    getUserProfileByEmail: 'get users/profile_by_email',
    getUsers: 'get users',
  },
}

const effectExecutors = {
  [endpoints.users.createUser]: createUser,
  [endpoints.users.getUserProfile]: getUserProfile,
  [endpoints.users.getUsers]: getUsers,
  [endpoints.users.getUserProfileByEmail]: getUserProfileByEmail,
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
