const router = require('express').Router();

const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentsRoutes');
const blogRoutes = require('./blogRoutes');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
