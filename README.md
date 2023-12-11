# Welcome to Rotten Potatoes - movie review website
using the PERN (PostgreSQL, Express.js, React, Node.js) stack our group (Tristan Anderson, Cameron Dixon, Aaron Jiles, Junior Pizzati, and Danh Cao) created a movie review website. 

##  How to deploy our site
1. Copy repo and git clone to you're desktop


2. Add a `.env` file with your secret value for authentication
```
JWT_SECRET='somesecretvalue'
```

3. Install packages
npm i


4. Create the database
createdb your-database-name
```

5. Update `src/server/db/client.js` to reflect the name of your database
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

6. Seed the database
npm run seed
```

7. Start the server
npm run dev
```

8. Open your browser at `http://localhost:3000`

9. Build something cool! 😎
