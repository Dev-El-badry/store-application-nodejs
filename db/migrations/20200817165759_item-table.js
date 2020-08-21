const Knex = require('knex');
const tableNames = require('../../src/constants/tableNames');

const {
    addDefaultColumns,
    createNameTable,
    references,
    url,
    email
} = require('../../src/lib/tabletUtils');

/**
 * 
 * @param {Knex} knex 
 */


exports.up = async (knex) => {

  

    await knex.schema.createTable(tableNames.size, (table) => {
      
        table.increments();
        table.string('name', 120).notNullable;
        table.float('length');
        table.float('width');
        table.float('height');
        references(table, tableNames.shape);
        table.float('volume');
        addDefaultColumns(table);

    });

    await knex.schema.createTable(tableNames.item, (table) => {
        table.increments();
        references(table, tableNames.user);
        table.string('name');
        references(table, tableNames.item_type);
        table.text('description');
        references(table, tableNames.manufacture);
        references(table, tableNames.size);
        table.string('sku', 42);
        table.boolean('sparks_joy').defaultTo(true);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.item_info, (table) => {
        table.increments();
        references(table, tableNames.user);
        references(table, tableNames.item);
        table.dateTime('purchase_date').notNullable();
        table.dateTime('expiration_date');
        references(table, tableNames.manufacture, true, 'retailer');
        table.dateTime('last_used');
        table.float('price').notNullable().defaultTo(0);
        table.float('msrp').notNullable().defaultTo(0);
        references(table, tableNames.location);
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.item_image, (table) => {
        table.increments();
        references(table, tableNames.item);
        url(table, 'image_url');
        addDefaultColumns(table);
    });

    await knex.schema.createTable(tableNames.related_item, (table) => {
        table.increments();
        references(table, tableNames.item);
        references(table, tableNames.item, false, 'related_item');
        addDefaultColumns(table);
    });
  
};


exports.down = async (knex) => {

  

    await Promise.all(
        [
            tableNames.size,
            tableNames.item,
            tableNames.item_info,
            tableNames.item_image,
            tableNames.related_item
        ].reverse().map((table) => knex.schema.dropTable(table))
    )

};
