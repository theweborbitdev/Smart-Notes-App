const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(error.errors)
        .map((item) => item.message)
        .join(", ")
    });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ message: "Malformed JSON request body" });
  }

  res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
};

module.exports = {
  notFound,
  errorHandler
};

