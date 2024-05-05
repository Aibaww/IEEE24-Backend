
const express = require('express');
const router = express.Router();
const getDatabase = require('../db.js');
const { ObjectId } = require('mongodb');



// GET route to fetch all users
router.get('/', async (req, res) => {
    try {

        const usersCollection = (await getDatabase()).collection('userinfo');
        const users = await usersCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});
router.post('/', async (req, res) => {
    try {
        const usersCollection = (await getDatabase()).collection('userinfo');
        const newUser = await usersCollection.insertOne(req.body); 
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Failed to add user:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const usersCollection = (await getDatabase()).collection('userinfo');
        console.log(usersCollection);
        const { id } = req.params; 
        const result = await usersCollection.deleteOne({ userid: id }); 
        if (result.deletedCount === 0) {
            return res.status(404).send("User not found");
        }
        res.status(204).send(); 
    } catch (error) {
        console.error("Failed to delete user:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});





module.exports = router;
