const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const moviesRouter = require('./moviescontroller'); 
const volleyball = require('volleyball')
const reviewsRouter = require('./reviews');
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const ratingRouter = require('./rates')

apiRouter.use(volleyball);
apiRouter.use('/movies', moviesRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/rates', ratingRouter);
// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const auth = req.header('Authorization');
  
  if (auth && !auth.startsWith('Bearer ')) {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with 'Bearer'`
    });
  } else {
    next();
  }
});


apiRouter.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong on the server';
  res.status(status).send({ error: message });
});


module.exports = apiRouter;
