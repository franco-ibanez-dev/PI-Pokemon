
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log("Pokemon database connected")
  server.listen(3001, () => {
    console.log("Server listening at port 3001"); // eslint-disable-line no-console
  });
});
