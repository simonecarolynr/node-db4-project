
exports.up = async function(knex) {
  knex.schema.createTable("recipes", tbl => {
      tbl.increments("id")
      tbl.text("name").notNull()
      tbl.text("creator").notNull()
      tbl.text("ingredients").notNull()
  })

  knex.schema.createTable("ingredients", tbl => {
    tbl.increments("id")
    tbl.text("name").notNull().unique()
    })

  knex.schema.createTable("recipes_ingredients", tbl => {
      tbl.integer("recipe_id").notNull().references("id").inTable("recipes")
      tbl.integer("ingredient_id").notNull().references("id").inTable("ingredients")
      tbl.text("quantity").notNull().unique()

      tbl.primary("recipe_id", "ingredient_id")
  })

};

exports.down = function(knex) {
    knex.schema.dropTableIfExists("ingredients")
    knex.schema.dropTableIfExists("recipes")
    knex.schema.dropTableIfExists("recipes_ingredients")
};
