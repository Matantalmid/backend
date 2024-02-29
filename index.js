const mongoose = require("mongoose");
const { app } = require("./app");
const { config } = require("./config");

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`the server is running on PORT ${PORT}`);
});
