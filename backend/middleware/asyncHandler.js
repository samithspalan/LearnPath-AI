// Wrapper to catch async errors in Express route handlers
const asyncHandler = (fn) => {
  return (req, res, next) => {
    try {
      const result = fn(req, res, next);
      if (result instanceof Promise) {
        result.catch(next);
      }
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;
