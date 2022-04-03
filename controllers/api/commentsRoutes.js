const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieves all comments from the blog(s)
router.get('/', (req, res) => {
    Comments.findAll()
    .then(dbCommentData => res.status(200).json(dbCommentData))
    .catch(err => {res.status(500).json(err)});
})


// Creating new comments (with user account)
router.post('/', withAuth, async (req, res) => {
    Comments.create({
        ...req.body,
        user_id: req.session.user_id,
        blog_id: req.body.blog_id
    })
    .then(dbCommentData => res.status(200).json(dbCommentData))
    .catch(err => {res.status(500).json(err)});
    
});

// Deleting comments from a blog post
router.delete('/:id', withAuth, (req, res) => {
    Comments.destroy({
        where: {id: req.params.id}
    })

    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({message: 'No blog with this id'});
            return;
        }
        res.status(200).json(dbCommentData);
    })
    .catch(err => {res.status(500).json(err)});
});

module.exports = router;