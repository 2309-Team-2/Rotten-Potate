const db = require('./client');
const { createUser } = require('./users');
const { createComment } = require('./comments')

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

const comments = [
  {
    content: "Inception engaged on a mainly intellectually level, but that isn't to say that film didn't pack an emotional impact.",
    review_id: 1,
    user_id: 2,
  },
  {
    content: "Live-action version of classic has some crude, scary moments.",
    review_id: 2,
    user_id: 1,
  },
];

const moviesSeedData = [
  {
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
      genre: "Sci-Fi",
      releaseYear: 2010,
      rating: 8.8
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    releaseYear: 1994,
    rating: 9.3
},
{
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "Crime, Drama",
    releaseYear: 1972,
    rating: 9.2
},
{
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    genre: "Action, Crime, Drama",
    releaseYear: 2008,
    rating: 9.0
},
{
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    genre: "Crime, Drama",
    releaseYear: 1994,
    rating: 8.9
},
{
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.",
    genre: "Drama",
    releaseYear: 1999,
    rating: 8.8
},
{
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    genre: "Drama, Romance",
    releaseYear: 1994,
    rating: 8.8
},
{
    title: "Inglourious Basterds",
    description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    genre: "Adventure, Drama, War",
    releaseYear: 2009,
    rating: 8.3
},
{
    title: "The Matrix",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    genre: "Action, Sci-Fi",
    releaseYear: 1999,
    rating: 8.7
},
{
    title: "Se7en",
    description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    genre: "Crime, Drama, Mystery",
    releaseYear: 1995,
    rating: 8.6
},
{
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: "Adventure, Drama, Sci-Fi",
    releaseYear: 2014,
    rating: 8.6
},

  // ... more movie data ...
];

const reviewsSeedData = [
  {
    movie_id: 1,
    user_id: 2,
    rating: 4.4, 
    comment: "Inception is not just a movie; it's a journey into the uncharted territories of the human mind. Directed by the visionary Christopher Nolan, this film is a mind-bending masterpiece that captivates and challenges its audience in ways few movies ever dare. From its gripping storyline to its breathtaking visual effects and stellar performances, Inception is a cinematic experience that will linger in your thoughts long after the credits roll.",
      },
  {
    movie_id: 2,
    user_id: 1,
    rating: 4.4,
    comment: "As a point of reference, I have always loved the character of the Grinch… As I've got older, I have found myself more and more being able to relate to the Grinch!!!!!! His grumpiness, his depression, his loneliness and even his dislike for Christmas… I've also even been described as a bit of a Grinch myself, so I think that's why it has become a tradition in my household to watch this film every Christmas!",
  },
  // ... more reviews
];

async function dropTables() {
  await db.query(`
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS reviews; 
  DROP TABLE IF EXISTS movies;
  DROP TABLE IF EXISTS users;
        `);
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


async function createTables() {
  try {
      await db.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at timestamp
      )`);

      await db.query(`
      CREATE TABLE IF NOT EXISTS movies (
          id SERIAL PRIMARY KEY,
          title VARCHAR,
          description VARCHAR,
          genre VARCHAR,
          release_year INTEGER,
          rating DECIMAL,
          created_at TIMESTAMP,
          updated_at TIMESTAMP
      )`);

      await db.query(`
      CREATE TABLE IF NOT EXISTS reviews (
          id SERIAL PRIMARY KEY,
          users_id INTEGER REFERENCES users(id),
          movie_id INTEGER REFERENCES movies(id),
          rating VARCHAR(255),
          comment VARCHAR(555),
          created_at timestamp,
          updated_at timestamp
      )`);

      await db.query(`
      CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          content VARCHAR,
          users_id INTEGER REFERENCES users(id),
          reviews_id INTEGER REFERENCES reviews(id)
      )`);
  } catch (err) {
      throw err;
  }
}

async function insertUsers() {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

async function insertComments() {
  try {
    for (let i = 0; i < comments.length; i++) {
      // const reviewId = reviews[i % reviews.length].id;
      // const userId = users[i % users.length].id;
      const commentContent = comments[i].content;
      const reviewId = comments[i].review_id
      const usersId = comments[i].user_id
      await createComment(commentContent, reviewId, usersId);
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
}

async function insertMovies() {
  try {
    for (const movie of moviesSeedData) {
      const { title, description, genre, releaseYear, rating } = movie;
      const result = await db.query(
        `INSERT INTO movies (title, description, genre, release_year, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [title, description, genre, releaseYear, rating]
      );
      console.log(result.rows[0]); 
    }
  } catch (err) {
    console.error('Error inserting movies:', err.stack);
  }
}

async function insertReviews() {
  try {
    for (const review of reviewsSeedData) {
      const { users_id, movie_id, rating, comment } = review;
      const result = await db.query(
        `INSERT INTO reviews (users_id, movie_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [users_id, movie_id, rating, comment]
      );
      console.log(result.rows[0]); // This will log the inserted review to the console
    }
  } catch (err) {
    console.error('Error inserting reviews:', err.stack);
  }
}

async function seedDatabase() {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertMovies();
    await insertReviews();
    await insertComments();
    console.log('Seed data inserted successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await db.end();
  }
}

seedDatabase()