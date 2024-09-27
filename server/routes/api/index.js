// Imports the express router
const router = require('express').Router();
// Imports the user and thought routes
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');

// Sets the routes for user and thoughts
router.use('/users', userRoutes);
router.use('/image', imageRoutes);

// Exports the router
module.exports = router;