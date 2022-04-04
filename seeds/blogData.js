const { Blog } = require('../models');

const blogData = [
    {
        title: "Test Blog 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id: 1
    },
    {
        title: "Test Blog 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id:2
    },
    {
        title: "Test Blog 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user_id: 3
    }

];

const seedBlogging = () => Blog.bulkCreate(blogData);

module.exports = seedBlogging;
