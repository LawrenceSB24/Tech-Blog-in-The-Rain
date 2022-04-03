const router = require('express').Router();
const { Blog, Comments, User } = require('../models');
const withAuth = require('../utils/auth');

// Retrieve all blog posts and JOIN with user & comment data
router.get('/', async (req, res) => {
    try{
        const blogData = Blog.findAll({
            attributes: ['id', 'title', 'description', 'created_at'],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'description', 'blog_id', 'user_id', 'created_at'],
                    include: {model: User, attributes: ['username']}
                },
                {model: User, attributes: ['username']}
            ]
        });

        const blogs = blogData.map((blog) => blog.get({plain: true}));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err)
    }

});

// Retrieving a specific blog post
router.get('/blog/:id', async (req, res) => {
    try{
        const blogData = Blog.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'title', 'description', 'created_at'],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'description', 'blog_id', 'user_id', 'created_at'],
                    include: {model: User, attributes: ['username']}
                },
                {model: User, attributes: ['username']}
            ]
        });

        if (!blogData) {
            res.status(404).json({message: 'No blog identified'});
            return;
        }

        const blog = blogData.get({plain: true});

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// middleware withAuth to prevent user access to route without login
router.get ('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Blog}]
        });

        const user = userData.get({plain: true});

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

// Once user is logged in, they are directed to their profile page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

// Once NEW user signs up for a account, they are brought to their profile page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('signup');
});

module.exports = router;