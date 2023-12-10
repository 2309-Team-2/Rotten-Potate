const express = require('express')
const usersRouter = express.Router();
const { getAllUsers, getUserById } = require('../db/users');

const {
    createUser,
    getUser,
    getUserByEmail
} = require('../db/');

const jwt = require('jsonwebtoken')

// Middleware to check if the request has a valid token
const authenticateToken = async (req, res, next) => {
    const auth = req.header('Authorization');

    if (!auth) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = auth.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        const user = await getUserById(decoded.userId);

        if (!user) {
            console.error('User not found');
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        console.log('Authenticated User:', req.user);
        next();
    } catch (err) {
        console.error('Token verification error:', err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        return res.status(403).json({ message: 'Forbidden' });
    }
};


usersRouter.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
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
usersRouter.get('/me', authenticateToken, async (req, res, next) => {
  try {
      delete req.user.password;
      res.send( req.user );
  } catch (error) {
      next(error);
  }
});


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

module.exports = usersRouter;
	