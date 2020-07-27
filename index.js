const express = require('express');
const app = express();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// import database connect method
const { connect } = require('./db_connection/connectDB');

app.use(express.json({extended: true}));

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// connect to mongodb database
connect();

const port = 3000;

app.listen(port, () => console.log(`Server is running on ${port}`));