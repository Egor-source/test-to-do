const express = require('express');
const router = express.Router();
const {
    getTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
} = require('./taskController');

router.get('/', getTasks);

router.post('/', addTask);

router.put('/:id', updateTaskStatus);

router.delete('/:id', deleteTask);

module.exports = router;
