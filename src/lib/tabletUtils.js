function addDefaultColumns(table) {
    table.timestamps(false, true);
    table.dateTime('deleted_at');
}

function createNameTable(knex, table_name) {
    return knex.schema.createTable(table_name, (table) => {
        table.increments().notNullable();
        table.string('name', 254).notNullable().unique();

        addDefaultColumns(table);
    });
}

function references(table, tableName, notNullable=true, collumnName='') {
    const definition = table
        .integer(`${collumnName || tableName}_id`)
        .unsigned()
        .references('id')
        .inTable(tableName)
        .onDelete('cascade');
    
    if (notNullable) {
        definition.notNullable();
    }

    return definition;
}

function url(table, table_name) {
    table.string(table_name, 2000);
}

function email(table, table_name) {
    return table.string(table_name, 254);
}

module.exports = {
    addDefaultColumns,
    createNameTable,
    references,
    url,
    email
};