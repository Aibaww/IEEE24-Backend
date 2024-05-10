
const express = require('express');
const router = express.Router();
const getDatabase = require('../db.js');
const { ObjectId } = require('mongodb');





router.get('/:user', async (req, res) => {
    try {
        const tabGroupsCollection = (await getDatabase()).collection('tabs');
        const userTabGroups = await tabGroupsCollection.find({'userid' : req.params.user}).toArray();
        res.json(userTabGroups);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.post('/user/:userId', async (req, res) => {
    try {
        const tabGroupsCollection = (await getDatabase()).collection('tabs');
        const userId = req.params.userId;

        // Create a newGroup object from the request body and ensure 'links' is initialized as an empty array
        const newGroup = {
            ...req.body, // spread the rest of the body in case there are other properties
            tabGroupName: req.body.tabGroupName,
            userid: userId,
            links: []  // Initialize 'links' as an empty array
        };

        // Optionally check if links are provided in the body, and use them if present
        if (req.body.links && Array.isArray(req.body.links)) {
            newGroup.links = req.body.links;
        }

        const result = await tabGroupsCollection.insertOne(newGroup);
        if (result.acknowledged) {
            const newDocument = await tabGroupsCollection.findOne({_id: result.insertedId});
            res.status(201).json(newDocument);
        } else {
            throw new Error("Document insertion failed");
        }

    } catch (error) {
        console.error("Failed to add tab group:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});


router.delete('/tab/:groupname', async (req, res) => {
    try {
        const db = (await dbPromise).db('users');
        const groupname = req.params.tabGroupName;

        
        const { ObjectId } = require('mongodb');
        const result = await db.collection('tabs').deleteOne({ groupName: groupname});
        
        if (result.deletedCount === 0) {
            return res.status(404).send("Tab not found");
        }
        res.status(204).send(); 
    } catch (error) {
        console.error("Failed to delete tab:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});
router.delete('/tab/:groupName/:url', async (req, res) => {
    try {
        const db = await getDatabase();
        const groupName = req.params.groupName;
        const urlToDelete = req.params.url;

        // Using $pull to remove a specific URL from the URLs array within the specified group
        const result = await db.collection('tabs').updateOne(
            { groupName: groupName },
            { $pull: { urls: urlToDelete } }
        );

        // Check if the document was found and modified
        if (result.matchedCount === 0) {
            return res.status(404).send("Tab group not found");
        } else if (result.modifiedCount === 0) {
            return res.status(404).send("URL not found in the tab group");
        }

        res.status(204).send(); // Successful deletion without returning any content
    } catch (error) {
        console.error("Failed to delete URL from tab group:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});
// Endpoint to add a new URL to a tab group
router.patch('/:groupName/add-url', async (req, res) => {
    try {
        const db = await getDatabase();
        const groupName = req.params.groupName;
        const newUrl = req.body.url; // Assuming the new URL is passed in the request body
        const userId = req.body.userId; // Getting userId from the request body

        // Check if the URL and userId to add are provided
        if (!newUrl || !userId) {
            return res.status(400).send("URL or User ID not provided");
        }

        // Using $push to add a new URL to the 'links' array within the specified group, but only if the userId matches
        const result = await db.collection('tabs').updateOne(
            { tabGroupName: groupName, userid: userId },
            { $push: { links: newUrl } }
        );

        // Check if the document was found and modified
        if (result.matchedCount === 0) {
            return res.status(404).send("Tab group not found or you do not have the permission to modify it");
        } else if (result.modifiedCount === 0) {
            return res.status(409).send("Could not add URL to the tab group");
        }

        res.status(200).json({ message: "URL added successfully to the tab group" });
    } catch (error) {
        console.error("Failed to add URL to tab group:", error);
        res.status(500).send("An error occurred: " + error.message);
    }
});



module.exports = router;