

const router = require('express').Router();


router.get('/api/tabs', async (req, res) => {
    try {
        const db = (await dbPromise).db('users');
        const tabs = await getAllTabs(db);
        res.json(tabs);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});


router.get('/api/tabs/user/:userId', async (req, res) => {
    try {
        const db = (await dbPromise).db('users');
        const userId = req.params.userId;
        const userTabs = await getTabsByUserId(db, userId);
        res.json(userTabs);
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});






module.exports = router;