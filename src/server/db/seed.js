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

const moviesSeedData = [
  {
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
      genre: "Sci-Fi",
      releaseYear: 2010,
      rating: 8.8
  },
  // ... more movie data ...
];

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS movie
        `)
    }
    catch(err) {
        throw err;
    }
}

async function seedDatabase() {
  try {
      for (let movie of moviesSeedData) {
          await db.query(
              'INSERT INTO movies (title, description, genre, release_year, rating) VALUES ($1, $2, $3, $4, $5)',
              [movie.title, movie.description, movie.genre, movie.releaseYear, movie.rating]
          );
      }
      console.log('Database seeded successfully');
  } catch (err) {
      console.error('Error seeding database:', err);
  }
}


const createTables = async () => {
    try{
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at timestamp
        )`
      )
      
      await db.query(
        ` 
        CREATE TABLE reviews (
          id integer PRIMARY KEY,
          user_id varchar(255),
          movie_id varchar(255),
          rating varchar(255),
          comment varchar(255),
          created_at timestamp,
          updated_at timestamp
        )`
        )
        await db.query(
           `
          CREATE Table comments (
             id integer PRIMARY KEY,
             content varchar,
            users_id integer,
             reviews_id integer
           )`
         )
         await db.query(
           `CREATE Table movie (
             id integer PRIMARY KEY,
             title varchar,
             description varchar,
             release_date varchar,
             created_at timestamp,            updated_at timestamp
           )`
         )
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