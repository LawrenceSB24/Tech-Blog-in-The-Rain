// Index file for Models
const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments')

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});


User.hasMany(Comments, {
    foreignKey: 'user_id'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comments.belongsTo(Blog, {
    foreignKey:'blog_id',
    onDelete: 'SET NULL'
});

Blog.hasMany(Comments, {
    foreignKey: 'blog_id',
    onDelete: 'SET NULL'
});


module.exports = {User, Blog, Comments}