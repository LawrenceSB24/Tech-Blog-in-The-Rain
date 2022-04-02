const router = require('express').Router();
const { Blog, User, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieval of all blog posts
router.get('/', (req, res) => {
    try {
        const blogData = Blog.findAll({
            attributes: ['id', 'title', 'description', 'created_at'],
            include: [
                {
                    model:Comments,
                    attributes: ['id', 'description', 'blog_id', 'user_id', 'created_at'],
                    include: {model: User, attibutes: ['username']}
                }
            ]
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieves a blog from one user
router.get('/:id', (req, res) => {
    try {
        const blogData = Blog.findOne({
            where: {id: req.params.id},
            attributes: ['id', 'title', 'description', 'created_at'],
            include: [
                {
                    model:Comments,
                    attributes: ['id', 'description', 'blog_id', 'user_id', 'created_at'],
                    include: {model: User, attibutes: ['username']}
                }
            ]
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})


// Creating new blog posts
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id
        });

        req.status(200).json(newBlog);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Updating blog posts
router.put('/:id', withAuth, async (req, res) => {
   try {
       const updateBlog = await Blog.update({
           where: {
               title: req.body.title,
               description: req.body.description
           }
       });

       if (!updateBlog) {
           res.status(404).json({message: 'No blog with this id'});
           return;
        }
        res.status(200).json(updateBlog); 
   } catch (err) {
       res.status(500).json(err);
   }
});

// Deleting blog posts
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!blogData) {
            res.status(404).json({message: 'No post found with this id.'});
            return;
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});