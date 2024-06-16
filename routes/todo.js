const { v4: uuidv4 } = require('uuid');    
const moment = require('moment');
const express = require('express');
const router = express.Router();

let mockData = [
    // { id: 1, title: 'Create a todo app', completed: false },
    // { id: 2, title: 'Create a backend server', completed: false },
    // { id: 3, title: 'Create a frontend app', completed: false }
];
router.get('/', (req, res) => {
    res.send({
        message : 'Todo data',
        data : mockData
    });
});
router.post('/' , (req, res) => {
    const todo = req.body;
    const id = uuidv4();
    todo.id = id;
    const createdAt =  moment().format('MMMM Do YYYY, h:mm:ss a')
    mockData.push({id, ...todo, createdAt});
    res.json({
        message : 'Todo added successfully',
        data : todo
    })
});
router.patch('/:id', (req,res) => {
    const id = req.params.id;
    const newUpdatedValue = req.body;
    let indexToUpdate = mockData.findIndex((item) => {
        return item.id === id;
    });
    const oldValueToBeUpdated = mockData[indexToUpdate];
    const updatedAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    mockData[indexToUpdate] = {
        ...oldValueToBeUpdated,
        ...newUpdatedValue,
        updatedAt
    };
    res.json({
        message : 'Todo updated successfully',
        data : mockData
    })
});
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    let indexToDelete = mockData.filter((item) => {
        return item.id !== id;
    });
    mockData = indexToDelete;
    res.json({
        message : 'Todo deleted successfully',
        data : mockData
    })
})

module.exports = router;