const sequelize = require('../config/connection');

const seedingUsers = require('./userData');
const seedComment = require('./commentData');
const seedBlogging = require('./blogData');



const seedDatabase = async () => {
    await sequelize.sync({force: true});
    console.log('========================');
    await seedingUsers();
    console.log('========================');

    await seedBlogging();
    console.log('========================');

    await seedComment();
    console.log('========================');

    process.exit(0)
}

seedDatabase();