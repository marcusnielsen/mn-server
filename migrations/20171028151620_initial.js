exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table
        .increments('id')
        .primary()
        .unique()
      table
        .string('email')
        .notNullable()
        .unique()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    }),

    knex.schema.createTable('logs', function(table) {
      table
        .increments('id')
        .primary()
        .unique()
      table.string('type').notNullable()
      table.string('text').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE users CASCADE'),
    knex.schema.raw('DROP TABLE logs CASCADE'),
  ])
}
