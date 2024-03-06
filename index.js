require('dotenv').config()
const express = require('express');
const app = express()
var router = express.Router();



router.get('/', (req, res) => {
    res.send(console.log('Hello World'));
}
);


const usersRouter = require('./routes/users');
const tabsRouter = require('./routes/tabs');
const  tasksRouter = require('./routes/tasks');


app.use('/users', usersRouter);
app.use('/tabs', tabsRouter);
app.use('/tasks', tasksRouter);



app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});


module.exports = router;
