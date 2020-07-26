const express = require('express');
const app = express();

const authRoute = require('./routes/auth');

// import database connect method
const { connect } = require('./db_connection/connectDB');

app.use(express.json({extended: true}));

app.use('/api/user', authRoute);

// connect to mongodb database
connect();

const port = 3000;

app.listen(port, () => console.log(`Server is running on ${port}`));