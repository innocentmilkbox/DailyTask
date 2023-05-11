import express from 'express';
import { CreateTask, DeleteTask, GetAllTasks, GetTaskById, GetTasksByUserId, GetTasksForUserByDate, UpdateTask_Done, UpdateTask_Info, UpdateTask_MoveToDay, UpdateTask_NotDone, UpdateTask_Postponed } from '../../services/index.js';

const router = express.Router();

router.get('/get-all', GetAllTasks);

router.get('/get-all-by-user/:userId', GetTasksByUserId);

router.get('/get-task-by-day/:userId', GetTasksForUserByDate);

router.get('/get-task-by-id/:id', GetTaskById);

router.post('/create-task', CreateTask);

router.put('/update-info', UpdateTask_Info);

router.put('/update-done/:id', UpdateTask_Done);

router.put('/update-notdone/:id', UpdateTask_NotDone);

router.put('/update-postponed/:id', UpdateTask_Postponed);

router.put('/update-move', UpdateTask_MoveToDay);

router.delete('/delete/:id', DeleteTask);

export {router as ToDoList_TaskRoute}