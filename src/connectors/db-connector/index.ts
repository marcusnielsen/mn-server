import { makeKnex } from './knex'

const getUsers = ({ knex }) =>
  knex.raw('SELECT * FROM users').then(({ rows }) =>
    rows.map(({ id, created_at, email }) => ({
      createdAt: created_at,
      email,
      id,
    }))
  )

const getProfile = ({ knex, data }) =>
  knex
    .raw('SELECT * FROM users WHERE id = ?', [data.id])
    .then(({ rows }) =>
      rows.map(({ id, created_at, email }) => ({
        createdAt: created_at,
        email,
        id,
      }))
    )
    .then(rows => rows[0])

const effectExecutors = {
  ['users/profile']: { get: getProfile },
  users: { get: getUsers },
}

const actions = {
  create: 'create',
  get: 'get',
}

const endpoints = {
  users: {
    profile: 'users/profile',
    root: 'users',
  },
}

const makeEffect = knex => ({ endpoint, action, data }) =>
  effectExecutors[endpoint][action]({
    data,
    knex,
  })

export function makeDbConnector({ host, user, password, database }) {
  const knex = makeKnex({ host, user, password, database })

  return {
    actions,
    effect: makeEffect(knex),
    endpoints,
  }
}
