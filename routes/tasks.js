const express = require('express');
const router = express.Router();
const getDatabase = require('../db.js');
const { ObjectId } = require('mongodb');

router.get('/:user', async (req, res) => {
    try {
        const tasksCollection = (await getDatabase()).collection('tasks');
        const userTasks = await tasksCollection.find({'userid': req.params.user}).toArray();
        res.json(userTasks);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.post('/user/:userId', async (req, res) => {
    try {
        const tasksCollection = (await getDatabase()).collection('tasks');
        const userId = req.params.userId;
        const newTask = req.body;
        newTask.userid = userId;

        const result = await tasksCollection.insertOne(newTask);
        if (result.acknowledged) {
            const newDocument = await tasksCollection.findOne({_id: result.insertedId});
            res.status(201).json(newDocument);
        } else {
            throw new Error("Document insertion failed");
        }
    } catch (error) {
        console.error("Failed to add task:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.delete('/task/:taskId', async (req, res) => {
    try {
        const tasksCollection = (await getDatabase()).collection('tasks');
        const taskId = req.params.taskId;
        const result = await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });

        if (result.deletedCount === 0) {
            return res.status(404).send("Task not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error("Failed to delete task:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});

module.exports = router;
