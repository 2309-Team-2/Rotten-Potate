const express = require('express')
const usersRouter = express.Router();
const { getAllUsers, getUserById, updateUserRole } = require('../db/users');
const { authenticateToken } = require('./authenticateToken');
const jwt = require("jsonwebtoken")
// const { deleteUser } = require('../db/users');

const {
    createUser,
    getUser,
    getUserByEmail,
    deleteUser,
} = require('../db/');

usersRouter.post('/register', async (req, res, next) => {
    const { name, email, password, role } = req.body;
  
    try {
      const _user = await getUserByEmail(email);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user with that email already exists',
        });
      }
        const user = await createUser({
            name,
            email,
            password,
            role: "user"
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
    } catch ({ name, message }) {
        next({ name, message });
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

usersRouter.get('/me', authenticateToken, async (req, res, next) => {
    try {
        // Assuming that the authenticated user information is stored in req.user
        const user = req.user;

        // Remove sensitive information (e.g., password) before sending the response
        if (user) {
            delete user.password;
        }

        // Send the user data in the response
        res.status(200).json(user);
    } catch (error) {
        // Handle errors
        console.error('Error in /me route:', error);
        res.status(500).json({ message: 'Internal server error' });
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

usersRouter.delete('/:userId', async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const deleteCount = await deleteUser(userId);

        if (deleteCount === 0) {
            return res.status(404).json({
                error: "User not found or already deleted"
            });
        }

        res.status(204).end(); // No content to send back, but the deletion was successful
    } catch (error) {
        next(error);
    }
});

usersRouter.put('/:userId/role', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { role } = req.body;
        await updateUserRole(userId, role);
        res.status(200).json({ message: 'User role updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = usersRouter;
	