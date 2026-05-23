const mongoose = require("mongoose");
const serverless = require("serverless-http");
const app = require("../../server/app");
const connectDB = require("../../server/config/db");

let cachedHandler;

const getHandler = async () => {
  if (mongoose.connection.readyState === 0) {
    await connectDB(process.env.MONGO_URI);
  }

  if (!cachedHandler) {
    cachedHandler = serverless(app);
  }

  return cachedHandler;
};

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const handler = await getHandler();
  return handler(event, context);
};

