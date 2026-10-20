const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `./config.env` });

console.log(process.env.DATABASE_LOCAL);
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log(`MongoDB Connected successfully.`));

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
