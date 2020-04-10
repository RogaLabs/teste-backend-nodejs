exports.up = function (knex) {
  knex.schema.hasTable("users").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("users", function (table) {
        table.increments(); // 👁 I prefer use autoincrement pk

        table.string("lat").notNullable();
        table.string("lng").notNullable();

        table.string("name").notNullable();
        table.string("cpf").notNullable();
        table.string("street").notNullable();
        table.string("district").notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
        table.string("country", 2).notNullable();
        table.string("zip").notNullable();

        table.timestamps();
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
