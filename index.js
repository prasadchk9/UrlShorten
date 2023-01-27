//import
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import connectDB from './config/db.js';
require('dotenv').config();


//imort routes
import postRouter from './routes/post';
import getRouter from './routes/get';
import deleteRouter from './routes/delete'
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

//connect with DB
connectDB();

// Body Parser
app.use('/', getRouter);
app.use('/api', postRouter);
app.use('/shortId', deleteRouter);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
