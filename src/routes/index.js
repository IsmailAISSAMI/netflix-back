const express = require('express');
const router = express.Router();
const usersRouter = require('./users.route');
const categoriesRouter = require('./categories.route');
const moviesRouter = require('./movies.route');
const checkoutRouter = require('./checkout.route');
const webHooksRouter = require('./webhooks.route');

router.use('/users/', usersRouter);
router.use('/categories/', categoriesRouter);
router.use('/movies/', moviesRouter);

router.use('/checkout',checkoutRouter);
router.use('/webhooks',webHooksRouter);

module.exports = router;