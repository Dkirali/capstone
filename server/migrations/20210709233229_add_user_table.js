exports.up = function(knex) {
  return knex.schema.createTable('users',table => {
    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('gamertag').notNullable();
    table.string('phone')
    table.string('address')
    table.string('gender')  
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
