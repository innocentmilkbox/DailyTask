import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {connection as sqlConnection} from './connect.js';
import { TaskTypeRoute } from './routes/task-types-route.js';
import { ToDoList_UserRoute, ToDoList_TaskRoute } from './routes/todolist/index.js';
// import sql from 'mssql/msnodesqlv8';

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello world');
})

// app.use('/task-types', TaskTypeRoute);

app.use('/api/todolist/users/', ToDoList_UserRoute);

app.use('/api/todolist/tasks/', ToDoList_TaskRoute);

app.listen(3000, () => {
    console.clear();
    console.log('App is listen to port 8000');
})


