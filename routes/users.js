//
// Phatic branch
//

const express = require('express');
const connectDB = require('../db');
const router = express.Router();


async function getDatabase() {
    const client = await connectDB();
    return client.db('users').collection('userinfo');
}

// GET route to fetch all users
router.get('/', async (req, res) => {
    try {
        const db = await getDatabase();
        const users = await db.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});
router.post('/', async (req, res) => {
    try {
        const db = await getDatabase();
        const newUser = await db.insertOne(req.body); 
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Failed to add user:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const db = await getDatabase();
        const { id } = req.params; 
        const result = await db.deleteOne({ _id: id }); 
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