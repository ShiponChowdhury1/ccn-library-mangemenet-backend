const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// CORS Configuration (Allow requests from both local and production frontend)
app.use(cors({
    origin: "https://ccn-university-library-client.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/books", require("./routes/book.route"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.log("MongoDB connection error:", err));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
