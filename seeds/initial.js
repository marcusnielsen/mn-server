exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users')
      .del()
      .then(function() {
        return knex('users').insert([
          { id: 1, email: 'mn@example.com', created_at: knex.fn.now() },
          { id: 2, email: 'mn2@example.com', created_at: knex.fn.now() },
          { id: 3, email: 'mn3@example.com', created_at: knex.fn.now() },
        ])
      }),
    knex('logs')
      .del()
      .then(function() {
        return knex('logs').insert([
          {
            id: 1,
            type: 'users',
            text: '<user created with id: [1]>',
            created_at: knex.fn.now(),
          },
          {
            id: 2,
            type: 'users',
            text: '<user created with id: [2]>',
            created_at: knex.fn.now(),
          },
          {
            id: 3,
            type: 'users',
            text: '<user created with id: [3]>',
            created_at: knex.fn.now(),
          },
        ])
      }),
  ])
}
