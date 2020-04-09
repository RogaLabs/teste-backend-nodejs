exports.up = function (knex) {
  knex.schema.hasTable("users").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("users", function (table) {
        table.increments(); // 👁 I prefer use autoincrement pk

        table.string("lat").notNullable();
        table.string("lon").notNullable();

        table.string("name").notNullable();
        table.string("cpf").notNullable();
        table.string("place").notNullable();
        table.string("city").notNullable();
        table.string("zip").notNullable();
        table.string("uf", 2).notNullable();
        table.string("country").notNullable();

        table.timestamps();
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
