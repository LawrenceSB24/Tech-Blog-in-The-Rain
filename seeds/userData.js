const { User } = require('../models');

const userData = [
    {
        username:'Potatoman75',
        email: 'pMan75@gmail.com',
        password: 'pwoirfg[0q349jfwejfwp0'
    },
    {
        username:'Statefarm12',
        email: 'StateFarm23475@gmail.com',
        password: '23089yrhpqowihfp98q'
    },
    {
        username:'TreeBeard902753',
        email: 'treeBird239@gmail.com',
        password: '2983yrpoqwahfw7e'
    }
];

const seedingUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedingUsers;