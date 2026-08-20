const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const main = require("./config/db");
const authRouter = require("./routes/userAuth");

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use("/user", authRouter);

const initializeConnection = async () => {
  try {
    await main();

    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server listening at port number: ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

initializeConnection();
