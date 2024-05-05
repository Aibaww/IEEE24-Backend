
const express = require('express');
const router = express.Router();
const getDatabase = require('../db.js');
const { ObjectId } = require('mongodb');





router.get('/:user', async (req, res) => {
    try {
        const tabsCollection = (await getDatabase()).collection('tabs');
        const userTabs = await tabsCollection.find({'userid' : req.params.user}).toArray();
        res.json(userTabs);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.post('/user/:userId', async (req, res) => {
    try {
        const tabsCollection = (await getDatabase()).collection('tabs');
        const userId = req.params.userId;
        const newTab = req.body; 
        newTab.userid = userId; 
        
        const result = await tabsCollection.insertOne(newTab);
        //res.status(201).json(result.ops[0]); 
        if (result.acknowledged) {
            // Using result.insertedId to fetch the newly inserted document, if needed
            const newDocument = await tabsCollection.findOne({_id: result.insertedId});
            res.status(201).json(newDocument);
        } else {
            throw new Error("Document insertion failed");
        }

    } catch (error) {
        console.error("Failed to add tab:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.delete('/tab/:tabId', async (req, res) => {
    try {
        const db = (await dbPromise).db('users');
        const tabId = req.params.tabId;

        
        const { ObjectId } = require('mongodb');
        const result = await db.collection('tabs').deleteOne({ _id: new ObjectId(tabId) });
        
        if (result.deletedCount === 0) {
            return res.status(404).send("Tab not found");
        }
        res.status(204).send(); 
    } catch (error) {
        console.error("Failed to delete tab:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});




module.exports = router;