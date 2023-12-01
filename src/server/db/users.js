const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await db.query(`
        INSERT INTO users(name, email, password)
        VALUES($1, $2, $3)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [name, email, hashedPassword]);

        if (!user) {
            throw new Error('User already exists with that email');
        }

        return user;
    } catch (err) {
        throw err;
    }
};

const getUser = async({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordsMatch) {
            throw new Error('Invalid password');
        }
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getAllUsers = async () => {
    try {
        const { rows: users } = await db.query(`SELECT * FROM users`);
        return users;
    } catch (err) {
        throw err;
    }
};


const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUsers 
};

