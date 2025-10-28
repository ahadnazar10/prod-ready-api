export default function errorHandler(err, req, res, next) {
  console.error(err); // later we'll use proper logger

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
