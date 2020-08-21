
const Knex = require('knex');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const tableName = require('../../src/constants/tableNames');
const orderedTableNames = require('../../src/constants/orderedTableNames');
const countries = require('../../src/constants/countries');

/**
 * 
 * @param {Knex} knex 
 */


exports.seed = async (knex) => {
 
  await orderedTableNames
  .reduce(async (promise, table_name) => {
    await promise;

    console.log('Clearing ', table_name);
    return knex(table_name).del();
  }, Promise.resolve());

  const password = crypto.randomBytes(15).toString('hex');

  const user = {
    email: 'eslam@admin.com',
    name: 'eslam',
    password: await bcrypt.hash(password, 12)
  };

  const [createUser] = await knex(tableName.user)
    .insert(user);

  console.log('created user', {
    password,
  });

  await knex(tableName.country).insert(countries);
  
  await knex(tableName.state).insert(
    [
      {
        name: 'Egypt'
      }
    ]
  );

};
