const db = require('./client');
const { createUser } = require('./users');
const { createComment } = require('./comments')

// ... users data ...
const users = [
  {
    name: 'Emily Johnson',
    username: "EmilyJ",
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    username: 'LittleLiu',
    email: 'liu@example.com',
    password: 'strongpass',
  },
];  

// ... comments data ...
const comments = [
  {
    content: "Inception engaged on a mainly intellectually level, but that isn't to say that film didn't pack an emotional impact.",
  },
  {
    content: "Live-action version of classic has some crude, scary moments.",
  },
];

// ... reviews data ... 
const reviews = [
  {
  rating: 4.4, 
  comment: "Inception is not just a movie; it's a journey into the uncharted territories of the human mind. Directed by the visionary Christopher Nolan, this film is a mind-bending masterpiece that captivates and challenges its audience in ways few movies ever dare. From its gripping storyline to its breathtaking visual effects and stellar performances, Inception is a cinematic experience that will linger in your thoughts long after the credits roll.",
    },
    {
      rating: 4.4,
      comment: "As a point of reference, I have always loved the character of the Grinch… As I've got older, I have found myself more and more being able to relate to the Grinch!!!!!! His grumpiness, his depression, his loneliness and even his dislike for Christmas… I've also even been described as a bit of a Grinch myself, so I think that's why it has become a tradition in my household to watch this film every Christmas!",
    },
  ];

// ... movies data ...

const movies = [
  {
    title: 'Inception', 
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    genre: 'Sci-Fi',
    releaseYear: 2010,
    rating: 8.8,
  },
  {
    title: 'How The Grinch Stole Christmas', 
    description: 'On the outskirts of Whoville lives a green, revenge-seeking Grinch who plans to ruin Christmas for all of the citizens of the town.',
    genre: 'Comedy',
    releaseYear: 2000,
    rating: 6.3
  },
];

const dropTables = async () => {
try {
  await db.query(`
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS movies;
  DROP TABLE IF EXISTS users;
  `);
} 
catch(err) {
  throw err;
}
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP
      )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        genre VARCHAR(255) NOT NULL,
        release_year INTEGER NOT NULL,
        rating DECIMAL(4,2) NOT NULL
      )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY,
        rating DECIMAL(4,2) NOT NULL,
        comment VARCHAR(255),
        user_id INTEGER,
        movie_id INTEGER,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (movie_id) REFERENCES movies (id)
      )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        content VARCHAR(255),
        review_id INTEGER,
        user_id INTEGER, 
        FOREIGN KEY (review_id) REFERENCES reviews (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`);

  } catch (err) {
    throw err;
  }
};


const 
insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({ name: user.name, username: user.username, email: user.email, password: user.password});
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const insertComments = async () => {
  try {
    for (let i = 0; i < comments.length; i++) {
      const reviewId = reviews[i % reviews.length].id;
      const userId = users[i % users.length].id;
      const commentContent = comments[i].content;

      await createComment(commentContent, reviewId, userId);
    }

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
}

async function insertMovies() {
  try {
    for (const movie of movies) {
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



const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertComments();
        await insertMovies();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabase()