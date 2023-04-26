import app from "./server";
import config from "./config/config";
import connectDB from "./db/connect";


connectDB().then(async function onServerInit() {
   console.log("Database connected");

   app.listen(config.app.PORT, () => {
      console.log("Server is running on port " + config.app.PORT);
   });
});