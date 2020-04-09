exports.up = function (knex) {
  knex.schema.hasTable("incidents").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("incidents", function (table) {
        table.increments(); // 👁 I prefer use autoincrement pk

        table.string("title").notNullable();
        table.string("description").notNullable();

        table.integer("user_id").references("id").inTable("users");

        table.timestamps();
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("incidents");
};
