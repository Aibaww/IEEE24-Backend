require('dotenv').config()
const express = require('express');
const app = express()
var router = express.Router();



router.get('/', (req, res) => {
    res.send(console.log('Hello World'));
}
);


const usersRouter = require('./routes/users');
const groupsRouter = require('./routes/tabGroups');
const  tasksRouter = require('./routes/tasks');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/tabs', groupsRouter);
app.use('/tasks', tasksRouter);



app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});


module.exports = router;
