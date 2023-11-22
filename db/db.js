const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'postgres',
  port: 5432,
})

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  }
}