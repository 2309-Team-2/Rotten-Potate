const db = require("./client");
const { createUser } = require("./users");
const { createComment } = require("./comments");
const moviesSeedData = require("./moviesSeedData");

// ... users data ...

const users = [
  {
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "securepass",
  },
  {
    name: "Liu Wei",
    email: "liu@example.com",
    password: "strongpass",
  },
  {
    name: "Isabella García",
    email: "bella@example.com",
    password: "pass1234",
  },
  {
    name: "Mohammed Ahmed",
    email: "mohammed@example.com",
    password: "mysecretpassword",
  },
  {
    name: "John Smith",
    email: "john@example.com",
    password: "password123",
  },
];

// ... comments data ...

const comments = [
  {
    content:
      "Inception engaged on a mainly intellectually level, but that isn't to say that film didn't pack an emotional impact.",
    review_id: 1,
    user_id: 2,
  },
  {
    content: "Live-action version of classic has some crude, scary moments.",
    review_id: 2,
    user_id: 1,
  },
];

// ... reviews data ...

const reviews = [
  {
    movie_id: 1,
    user_id: 2,
    rating: 4.4,
    comment:
      "Inception is not just a movie; it's a journey into the uncharted territories of the human mind. Directed by the visionary Christopher Nolan, this film is a mind-bending masterpiece that captivates and challenges its audience in ways few movies ever dare. From its gripping storyline to its breathtaking visual effects and stellar performances, Inception is a cinematic experience that will linger in your thoughts long after the credits roll.",
  },
  {
    movie_id: 2,
    user_id: 1,
    rating: 4.4,
    comment:
      "As a point of reference, I have always loved the character of the Grinch… As I've got older, I have found myself more and more being able to relate to the Grinch!!!!!! His grumpiness, his depression, his loneliness and even his dislike for Christmas… I've also even been described as a bit of a Grinch myself, so I think that's why it has become a tradition in my household to watch this film every Christmas!",
  },
];

async function seedDatabase() {
  try {
    for (let movie of moviesSeedData) {
      await db.query(
        "INSERT INTO movies (title, description, genre, release_year, rating) VALUES ($1, $2, $3, $4, $5)",
        [
          movie.title,
          movie.description,
          movie.genre,
          movie.releaseYear,
          movie.rating,
        ]
      );
    }
    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

const dropTables = async () => {
  try {
    await db.query(`
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS movies;
  DROP TABLE IF EXISTS users;
  `);
  } catch (err) {
    throw err;
  }
};

async function createTables() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP
      )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS movies (
          id SERIAL PRIMARY KEY,
          image_url TEXT,
          title VARCHAR(100) NOT NULL,
          description VARCHAR(500) NOT NULL,
          genre VARCHAR (50) NOT NULL,
          release_year INTEGER NOT NULL,
          rating DECIMAL(4,2) NOT NULL
      )`);

    await db.query(`
      CREATE TABLE IF NOT EXISTS reviews (
          id SERIAL PRIMARY KEY,
          rating DECIMAL(4,2) NOT NULL,
          comment VARCHAR(555),
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
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        FOREIGN KEY (review_id) REFERENCES reviews (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`);
  } catch (err) {
    throw err;
  }
}

async function insertUsers() {
  try {
    for (const user of users) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        created_at: formattedDate,
      });
    }
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
}

async function insertComments() {
  try {
    for (let i = 0; i < comments.length; i++) {
      // const reviewId = reviews[i % reviews.length].id;
      // const userId = users[i % users.length].id;
      const commentContent = comments[i].content;
      const reviewId = comments[i].review_id;
      const usersId = comments[i].user_id;
      const createdAt = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const updatedAt = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      await createComment(
        commentContent,
        reviewId,
        usersId,
        createdAt,
        updatedAt
      );
    }

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
}

async function insertMovies() {
  try {
    for (const movie of moviesSeedData) {
      const { imageUrl, title, description, genre, releaseYear, rating } =
        movie;
      const result = await db.query(
        `INSERT INTO movies (image_url, title, description, genre, release_year, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [imageUrl, title, description, genre, releaseYear, rating]
      );
      console.log(result.rows[0]);
    }
  } catch (err) {
    console.error("Error inserting movies:", err.stack);
  }
}

async function insertReviews() {
  try {
    for (const review of reviews) {
      const { users_id, movie_id, rating, comment } = review;
      const createdAt = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const updatedAt = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const result = await db.query(
        `INSERT INTO reviews (user_id, movie_id, rating, comment, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [users_id, movie_id, rating, comment, createdAt, updatedAt]
      );
      console.log(result.rows[0]); // This will log the inserted review to the console
    }
  } catch (err) {
    console.error("Error inserting reviews:", err.stack);
  }
}

async function seedDatabase() {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertMovies();
    await insertReviews();
    await insertComments();
    console.log("Seed data inserted successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await db.end();
  }
}

seedDatabase();
