const {Comments} = require('../models');

const comData = [
    {
        comment_description: 'I can always rely on ORMs',
        user_id: 1,
        blog_id: 1
    },

    {
        comment_description: 'Thank you for explaining the MVC paradigm structure',
        user_id: 2,
        blog_id: 2
    },

    {
        comment_description: 'Thank you for explaining handlebars.js in clearer details',
        user_id: 3,
        blog_id: 3
    }
];

const seedComment = () => Comments.bulkCreate(comData);

module.exports = seedComment;