import app from './server';
import config from './config/config';
import connectDB from './db/connect';
// import fillDatabase from './db/fillDatabase';

connectDB().then(async function onServerInit() {
  console.log('Database connected');
  // await fillDatabase();

  app.listen(config.app.PORT, () => {
    console.log('Server is running on port ' + config.app.PORT);
  });
});
