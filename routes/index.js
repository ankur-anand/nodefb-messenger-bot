const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);

// Default
router
  .route('/')
  .get(function(req, res) {
    res.status(200).json({
      status: 200,
      message: 'Welcome to the Chatbot'
    });
  })
  .all(err => {
    res.status(403).json({
      error: 'Method Not Allowed'
    });
  });

module.exports = router;
