const express = require("express");
const connectDB = require("./config/db");

const app = express();
//connect database
connectDB();

const PORT = process.env.PORT || 5000;
//init middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API is running"));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => {
  console.log("server is up on port " + PORT);
});
