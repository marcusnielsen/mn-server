export const createUser = ({ knex, data }) =>
  knex.raw('INSERT INTO users (email) VALUES(?)', data.email)

export const getUsers = ({ knex, data }) =>
  knex.raw('SELECT * FROM users').then(({ rows }) =>
    rows.map(({ id, created_at, email }) => ({
      createdAt: new Date(created_at).toISOString(),
      email,
      id,
    }))
  )

export const getUserProfileByEmail = ({ knex, data }) =>
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

export const getUserProfile = ({ knex, data }) =>
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
