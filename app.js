const express = require("express");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

module.exports = app;
