const router = require('express').Router();

const dashboardRoutes = require('./dashRoutes.js');
const apiRoutes = require('./api/');
const homeRoutes = require('./homeRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;