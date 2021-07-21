exports.up = function(knex) {
  return knex.schema.alterTable("users", table => {
    table.string('rank')
    table.string('point')
    table.string('platform')
    table.string('role')
    table.string('time')
    table.string('day')
    table.string('crossplay')
    table.string('description', 500)
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("users", table => {
    table.dropColumn('rank')
    table.dropColumn('point')
    table.dropColumn('platform')
    table.dropColumn('role')
    table.dropColumn('time')
    table.dropColumn('day')
    table.dropColumn('crossplay')
    table.dropColumn('description')
  })
};
