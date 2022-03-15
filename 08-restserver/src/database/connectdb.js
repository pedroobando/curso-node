const mongoose = require('mongoose');
// process.env.DB_MONGO

const connectdb = () => {
  try {
    mongoose
      .connect(`${process.env.MONGODB_CNN}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreatendex: true,
        // useFindAndModify: false,
      })
      .then((dbm) => console.log(`{:DB:} Connected ready - ${dbm.connection.host}`));
  } catch (error) {
    console.log('{:DB:} Error', error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
