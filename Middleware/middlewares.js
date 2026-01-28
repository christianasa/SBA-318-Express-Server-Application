// Custom middleware functions

// Middleware #1: Request logger
export function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
}

// Middleware #2: Request timer
export function requestTimer(req, res, next) {
  req.startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(`Request to ${req.url} took ${duration}ms`);
  });
  
  next();
}

// Error handling middleware
export function errorHandler(err, req, res, next) {
  console.error('Error occurred:', err.message);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message: message,
      status: statusCode
    }
  });
}