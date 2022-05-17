const router = require('express').Router();
const { User, Blog, Comments } = require('../../models');

// Creating user account info
router.post('/', async (req, res) => {
    User.create(req.body)
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.logged_in = true;
    
                req.statusCode(200).json(dbUserData);
            })
        })
        .catch(err => {res.status(500).json(err)});
});

// Finds blog from specific user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: password},
        where: {id: req.params.id},
        include: [
            {model: Blog, attributes: ['id', 'title', 'created_at']},
            {
                model: Comments, 
                attributes: ['id', 'description', 'created_at'],
                include: {model:Blog, attributes: ['title']
            }
        }]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No blog with this id'});
            return;
        }
        res.status(200).json(dbUserData);
    })
    .catch(err => {res.status(500).json(err)});
})

// Allowing users to create their own account login info
router.post('/login', async (req, res) => {
    User.findOne({where: {username: req.body.username} })
    .then(dbUserData => {
        if (!dbUserData) {
            res
                .status(400)
                .json({message: 'Incorrect username, please try again.'});
            return;
        }
    
        const validPassword = dbUserData.checkPassword(req.body.password);
    
        if (!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect password, please try again.'});
            return;
        }
    
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.logged_in = true;

            res.json({user: dbUserData, message: 'You are now logged in'})
        });
    })
});

// Sign-up sheet for new users
router.post('/signup', async (req, res) => {
    var userGen = await User.create(req.body)
    req.session.save(() => {
        req.session.user_id = userGen.id;
        req.session.username = userGen.username;
        req.session.logged_in = true;

        res.json({user: userGen, message: 'You are now logged in'})
    });
})


// Allowing users to log out of session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {

        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});

// Updates the user accounts
router.put('/:id', (req, res) => {
    try{
        const userData = User.update(req.body,
            {individualHooks: true, where: {id: req.params.id}}
        )
        
        if (!userData) {
            res.status(404).json({message: 'No user identified.'});
            return;
        }
        res.status(200).json(userData);
        
    } catch (err) {
        res.status(500).json(err)
    }
});

// Removes user account when user logs out
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {id: req.params.id}
    })

    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No blog with this id'});
            return;
        }
        res.status(200).json(dbUserData);
    })
    .catch(err => {res.status(500).json(err)});
});

module.exports = router;