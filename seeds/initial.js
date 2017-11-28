exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users')
      .del()
      .then(function() {
        return knex('users').insert([
          { email: 'mn@example.com' },
          { email: 'mn2@example.com' },
          { email: 'mn3@example.com' },
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
