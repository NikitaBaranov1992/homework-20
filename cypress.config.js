const { defineConfig } = require("cypress");
const { reject } = require("cypress/types/bluebird");
const { result } = require("cypress/types/lodash");

module.exports = defineConfig({
  env: {
    db: {
      host: "db4free.net",
      user: "nikitab",
      password: "GoodPassword10",
      database: "it_switchernb",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});
const mysql = require("mysql");
function queryTestDb(query, config) {
  const connection = createConnection(config.env.db);
  connection.connect();
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
