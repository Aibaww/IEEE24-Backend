//
// Phatic branch
//
// ** needs to be debugged **

const router = require('express').Router();



router.get('/user/:userId', async (req, res) => {
    try {
        const db = (await dbPromise).db('users'); // undefined dbPromise
        const userId = req.params.userId;
        const userTabs = await db['tabs'].find({'userid' : userId})
        res.json(userTabs);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});

router.post('/user/:userId', async (req, res) => {
    try {
        const db = (await dbPromise).db('users');
        const userId = req.params.userId;
        const newTab = req.body; 
        newTab.userId = userId; 
        
        
        const result = await db.collection('tabs').insertOne(newTab);
        res.status(201).json(result.ops[0]); 
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