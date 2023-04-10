const errorHandler = async (error) => {
  return {
    status: error.status,
    message: error.message,
  };
};

module.exports = { errorHandler };
