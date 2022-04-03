const router = require('express').Router();
const { Blog, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieval of all blog posts
router.get('/', (req, res) => {
    
    Blog.findAll({
        attributes: ['id', 'title', 'description', 'created_at'],
        include: [
            {
                model:Comments,
                attributes: ['id', 'description', 'blog_id', 'user_id', 'created_at'],
                include: {model: User, attibutes: ['username']}
            }
        ]
    })
    .then(dbBlogData => res.status(200).json(dbBlogData))
    .catch(err => {res.status(500).json(err)});
});

// Retrieves a blog from one user
router.get('/:id', (req, res) => {
    
    Blog.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'description', 'created_at'],
        include: [
            {
                model:Comments,
                attributes: ['id', 'description', 'blog_id', 'user_id', 'created_at'],
                include: {model: User, attibutes: ['username']}
            }
        ]
    })
    .then(dbBlogData => res.status(200).json(dbBlogData))
    .catch(err => {res.status(500).json(err)});
})


// Creating new blog posts
router.post('/', withAuth, async (req, res) => {
    Blog.create({
        ...req.body,
        user_id: req.session.user_id
    })
    .then(dbBlogData => res.status(200).json(dbBlogData))
    .catch(err => {res.status(500).json(err)});
});

// Updating blog posts
router.put('/:id', withAuth, async (req, res) => {
   
    Blog.update({
        where: {
            title: req.body.title,
            description: req.body.description
        }
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({message: 'No blog with this id'});
            return;
        }
        res.status(200).json(dbBlogData);
    })
    .catch(err => {res.status(500).json(err)});
   
});

// Deleting blog posts
router.delete('/:id', withAuth, async (req, res) => {
    
        Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({message: 'No blog with this id'});
                return;
            }
            res.status(200).json(dbBlogData);
        })
        .catch(err => {res.status(500).json(err)});
});

module.exports = router;