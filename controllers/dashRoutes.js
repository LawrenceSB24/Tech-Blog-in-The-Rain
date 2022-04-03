const router = require('express').Router();
const {Blog, User, Comments} = require('../models');
const withAuth = require('../utils/auth');

const sequelize = require('../config/connection');

// Retrieves all blog posts from the dashboard
router.get('/', withAuth, (req, res) => {
    try {
        const blogData = Blog.findAll({
            where: {user_id: req.session.user_id},
            attributes: ['id', 'title', 'description', 'created_at'],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'comment_description', 'blog_id', 'user_id', 'created_at'],
                    include: {model:User, attributes: ['username']}
                },
                {model: User, attributes: ['username']}
            ]
        });

        const blogs = blogData.map(blog => blog.get({plain: true}));

        res.render('dashboard', {blogs, logged_In: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Only allows users to edit blog posts in dashboard AFTER loggin in
router.get('/edit/:id', withAuth, (req, res) => {
    try {
        const blogData = Blog.findByPk(
            req.params.id,
            {
                attributes: ['id', 'title', 'description', 'created_at'],
                include: [
                    {
                        model: Comments,
                        attributes: ['id', 'comment_description', 'blog_id', 'user_id', 'created_at'],
                        include: {model: User, attributes: ['username']}
                    },
                    {model: User, attributes: ['username']}
                ]
            }
        );

        if (blogData) {
            const blog = blogData.get({plain: true});

            res.render('edit-blog', {
                blog,
                logged_In: true
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;