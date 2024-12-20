const taskService = require('./taskService');

const getTasks = async (req, res) => {
    try {
        const tasks = await taskService.getTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};

const addTask = async (req, res) => {
    const {text} = req.body;
    try {
        const task = await taskService.addTask(text);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

const updateTaskStatus = async (req, res) => {
    const {id} = req.params;
    const {completed} = req.body;
    try {
        const task = await taskService.updateTaskStatus(id, completed);
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

const deleteTask = async (req, res) => {
    const {id} = req.params;
    try {
        await taskService.deleteTask(id);
        res.status(200).send({message: 'success'});
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
};
