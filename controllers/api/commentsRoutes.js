const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieves all comments from the blog(s)
router.get('/', (req, res) => {
    try {
        const comData = await Comments.findAll();
        res.status(200).json(comData);
    } catch (err) {
        res.status(500).json(err);
    }
})


// Creating new comments (with user account)
router.post('/', withAuth, async (req, res) => {
    try{
        const newComment = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
            blog_id: req.body.blog_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deleting comments from a blog post
router.delete('/:id', withAuth, (req, res) => {
    try {
        const delCommentData = await Comments.destroy({
            where: {id: req.params.id}
        })

        if (!delCommentData) {
            res.status(404).json({message: 'No comment identified'});
            return;
        }

        res.status(200).json(delCommentData);
    } catch (err) {
        res.status(500).json(err);
    }
});