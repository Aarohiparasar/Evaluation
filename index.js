const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 5008;
const MONGO = process.env.MONGO;

mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
