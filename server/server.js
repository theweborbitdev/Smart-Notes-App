const dotenv = require("dotenv");
const path = require("path");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
