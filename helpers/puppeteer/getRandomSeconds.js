const getRandomSeconds = (min, max) =>
  process.env.NODE_ENV === "production" ? Math.random() * (max - min) + min : 0;

module.exports = getRandomSeconds;
