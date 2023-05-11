import express from 'express';

import {GetAllUsers, GetUserById, LogOut, Login, SignUp} from '../../services/index.js';

const router = express.Router();

router.get('/get-all-users', GetAllUsers)

router.get('/get-by-id/:id', GetUserById)

router.post('/login', Login)

router.post('/sign-up', SignUp);

router.put('/logout/:id', LogOut);

export {router as ToDoList_UserRoute}