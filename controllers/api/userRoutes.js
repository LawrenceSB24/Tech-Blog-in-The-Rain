const router = require('express').Router();
const { User, Blog, Comments } = require('../../models');

// Creating user account info
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            req.statusCode(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Allowing users to create their own account login info
router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({where: {username: req.body.username} });

        if (!userData) {
            res
                .status(400)
                .json({message: 'Incorrect username or password, please try again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({message: 'Incorrect username or password, please try again.'});
            return;
        }

        res.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({user: userData, message: 'You are now logged in'})
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

// Finds blog from specific user
router.get(':/id', (req, res) => {
    try{
        const userData = await User.findOne({
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
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// Sign-up sheet for new users
router.post('/signup', async (req, res) => {
    var userGen = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        await User.findOne({
            where: {
                username: req.body.username,
                email: req.body.email
            }
        })
        .then(async profile => {
            if (!profile) {
                await userGen.save()
                .then(() => {
                    res.status(200).send(userGen)
                })
            } else {
                res.send('User account currently exists.')
            }
        })
    } catch (err) {
        res.status(400).json(err);
    }
})


// Allowing users to log out of session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {

        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Updates the user accounts
router.put('/:id', (req, res) => {
    try{
        const userData = await User.update(req.body,
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
    try{
        const userData = await User.destroy({
            where: {id: req.params.id}
        })

        if (!userData) {
            res.status(404).json({message: 'No user identified'});
            return;
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;