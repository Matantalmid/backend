const express = require("express");
const usersRouter = require("./Routers/user.routes");
const eventRouter = require("./Routers/event.routes");
const purchaseRouter = require("./Routers/purchase.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", usersRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/purchase", purchaseRouter);

module.exports = { app };
