const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

async function connectionOracle() {

  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = connectionOracle();