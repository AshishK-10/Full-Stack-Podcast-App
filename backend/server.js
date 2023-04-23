const express = require('express')
const dotenv = require("dotenv")
const cors = require('cors')
const connectDb = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const podcastRoutes = require('./routes/podcastRoutes')
const {errorHandler, notFound} = require('./middleware/errorMiddleware');

const app = express();
dotenv.config();
connectDb(); //connected db

app.use(express.json());
app.use(cors());
app.use(express.json()); // to accept the json data

app.use('/api/user', userRoutes) // /api/user routes
app.use('/api/podcast', podcastRoutes) // /api/podcast routes

// error handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(5000, console.log(`server started on port ${port}`.yellow.bold))
