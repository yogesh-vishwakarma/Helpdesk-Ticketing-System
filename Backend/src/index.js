const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const http=require("http");

const main = require("./config/db");
const authRouter = require("./routes/userAuth");
const managementRouter = require("./routes/managementRouter");
const ticketRouter = require("./routes/ticketRouter");
const commentRouter=require("./routes/commentRouter")
const dashboardRouter=require("./routes/dashboardRouter");


const { initializeSocket } = require("./socket");

const cors=require('cors');

const app = express();
app.use(cookieParser());

app.use(cors({
  origin:[
    'http://localhost:5173',
    "https://helpdesk-ticketing-frontend.vercel.app",
     ],
  credentials: true 
}))

app.use(express.json());

app.use("/auth", authRouter);
app.use("/management", managementRouter);
app.use("/tickets", ticketRouter);
app.use("/comments",commentRouter)
app.use("/dashboard",dashboardRouter);


//Http Server
const server=http.createServer(app);


//socket.io
initializeSocket(server);

const initializeConnection = async () => {
  try {
    await main();

    console.log("DB Connected");

    server.listen(process.env.PORT, () => {
      console.log(`Server listening at port number: ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
};

initializeConnection();
