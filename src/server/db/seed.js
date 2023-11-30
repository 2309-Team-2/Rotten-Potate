const db = require('./client');
const { createUser } = require('./users');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE [users] (
          [id] integer PRIMARY KEY,
          [username] nvarchar(255),
          [email] nvarchar(255),
          [password] nvarchar(255),
          [created_at] timestamp
        )`)
    }
    catch(err) {
        throw err;
    }
}

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const seedDatabse = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabse()
