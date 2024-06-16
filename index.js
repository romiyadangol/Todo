const express = require('express');
const app = express();
const todoRouter = require('./routes/todo');
app.use(express.json());

app.use('/todo', todoRouter);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});