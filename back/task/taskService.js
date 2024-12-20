const { getSession } = require('../db');

const getTasks = async () => {
    try {
        const session = getSession();
        const result = await session.run('MATCH (t:Task) RETURN t');
        return result.records.map(record => ({
            id: record.get('t').identity.low,
            text: record.get('t').properties.text,
            completed: record.get('t').properties.completed,
        }));
    } catch (err) {
        throw new Error('Error fetching tasks');
    }
};

const addTask = async (text) => {
    try {
        const session = getSession();
        const result = await session.run('CREATE (t:Task {text: $text, completed: false}) RETURN t', {
            text,
        });
        return {
            id: result.records[0].get('t').identity.low,
            text,
            completed: false,
        };
    } catch (err) {
        throw new Error('Error creating task');
    }
};

const updateTaskStatus = async (id, completed) => {
    try {
        const session = getSession();
        const result = await session.run(
            'MATCH (t:Task) WHERE ID(t) = $id SET t.completed = $completed RETURN t',
            { id: parseInt(id), completed }
        );
        if (result.records.length === 0) {
            throw new Error('Task not found');
        }
        return {
            id: result.records[0].get('t').identity.low,
            text: result.records[0].get('t').properties.text,
            completed: result.records[0].get('t').properties.completed,
        };
    } catch (err) {
        throw new Error('Error updating task');
    }
};

const deleteTask = async (id) => {
    try {
        const session = getSession();
        const result = await session.run('MATCH (t:Task) WHERE ID(t) = $id DELETE t', {
            id: parseInt(id),
        });
        if (result.summary.counters.nodesDeleted === 0) {
            throw new Error('Task not found');
        }
    } catch (err) {
        throw new Error('Error deleting task');
    }
};

module.exports = {
    getTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
};
