// ERROR HANDLING + MESSAGE LAYER: one place that turns errors into JSON responses.
// Every error body has the shape { message } so clients only need one check.

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  // Malformed JSON bodies from express.json()
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Malformed JSON body' });
  }
  if (err.status && err.status < 500) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error('Unhandled error:', err);
  return res.status(500).json({ message: 'Internal server error' });
};
