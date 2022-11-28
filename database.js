import sqlite3  from "sqlite3";
sqlite3.verbose();

let db = new sqlite3.Database('./db/Myblog.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

  export {db};