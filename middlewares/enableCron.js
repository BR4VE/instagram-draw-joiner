// middleware for enabling just CRON JOB requests

module.exports = () =>
  process.env.NODE_ENV === "production"
    ? (req, res, next) => {
        if (!req.header("X-Appengine-Cron")) return res.status(500);
        next();
      }
    : (req, res, next) => {
        next();
      };
