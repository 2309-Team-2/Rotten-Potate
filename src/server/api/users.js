const express = require('express')
const usersRouter = express.Router();
const { getAllUsers, getUserById } = require('../db/users');
const { authenticateToken } = require('./authenticateToken');


const {
    createUser,
    getUser,
    getUserByEmail
} = require('../db/');

usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})
usersRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({ email, password });
        if (user) {
            const token = jwt.sign({
                userId: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (err) {
        next(err);
    }
});

usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        next(error);
    }
});
usersRouter.use(authenticateToken)
usersRouter.get('/me', authenticateToken, async (req, res, next) => {
    try {
        delete req.user.password;
        res.send( req.user );
    } catch (error) {
        next(error);
    }
});


usersRouter.get('/:id', async (req, res, next) => {
    const userId = req.params.id;

    try {
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally, you can exclude sensitive information like the password before sending the response
        delete user.password;

        res.json(user);
    } catch (error) {
        next(error);
    }
});


module.exports = usersRouter;
	