const {Pool} = require('pg');
const path = require("path");
require("dotenv").config({
  override: true,
  path: path.join(__dirname, "../.env.development"),
});

module.exports=new Pool({
    connectionString:process.env.DATABASE_URL,
})

