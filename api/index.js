
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { preChargeTypes } = require('./src/controllers/types.js');
const { PORT } = process.env;
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  preChargeTypes()
  console.log("Pokemon database connected")
  server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`); // eslint-disable-line no-console
  });
});

