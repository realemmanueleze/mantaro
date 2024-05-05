class CustomAPIError extends Error {
  constructor(message) {
    super(message, this.statusCode);
    this.statusCode = statusCode;
  }
}

module.exports = CustomAPIError;
