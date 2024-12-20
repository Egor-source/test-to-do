const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./task/taskRouts');
const { connectToDatabase } = require('./db');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

connectToDatabase();

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
