import {todoListConnection as sqlConnection} from '../connect.js';
import sql from 'mssql/msnodesqlv8.js';
import { GroupTaskByDay, ResponseBase } from '../utils/index.js';
import {EmptyRecordSet} from '../utils/index.js';

export const GetAllTasks = async (req, res, next) => {
    const pool = await sqlConnection;
    const queryString = "SELECT * FROM [TASKS]";
    return await pool.request().query(queryString, (err, data)=>{
        if(err == null){
            res.json(ResponseBase(true, data.recordset, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const GetTasksByUserId = async (req, res, next) => {
    const pool = await sqlConnection;
    const queryString = "SELECT * FROM [TASKS] WHERE [UserId] = @userId";
    return await pool.request()
    .input('userId', sql.Int, req.params.userId)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, data.recordset, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const GetTasksForUserByDate = async (req, res, next) => {
    const pool = await sqlConnection;    
    const queryString = "SELECT * FROM [TASKS] WHERE [UserId] = @userId AND [TASKDAY] = @date";
    return await pool.request()
    .input('userId', sql.Int, req.params.userId)
    .input('date', sql.Date, req.query.date)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, GroupTaskByDay(new Date(req.query.date), data.recordset), null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const GetTaskById = async (req, res, next) => {
    const pool = await sqlConnection;
    const queryString = "SELECT * FROM [TASKS] WHERE [Id] = @id";
    return await pool.request()
    .input('id', sql.Int, req.params.id)
    .query(queryString, (err, data) => {
        if(err == null){
            if(EmptyRecordSet(data)){
                res.json(ResponseBase(false, null, 'Not Found'))
            }
            res.json(ResponseBase(true, data.recordset[0], null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const CreateTask = async (req, res, next) => {
    const {UserId, Title, Summary, Note, TaskDay, isDone, taskStatus} = req.body;
    const pool = await sqlConnection;
    const queryString = `INSERT INTO [TASKS] 
    (UserId, Title, Summary, Note, TaskDay, TaskStatus)
    VALUES(@userId, @title, @summary, @note, @taskDay, @taskStatus)`;
    return await pool.request()
    .input('userId', sql.Int, UserId)
    .input('title', sql.NVarChar, Title)
    .input('summary', sql.NVarChar, Summary)
    .input('note', sql.NVarChar, Note)
    .input('taskDay', sql.Date, TaskDay)    
    .input('taskStatus', sql.Int, taskStatus || 0)
    .query(queryString, (err, data)=>{
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const UpdateTask_Info = async (req, res, next) => {
    const {Id, Title, Summary, Note} = req.body
    const pool = await sqlConnection;
    const queryString = `UPDATE [TASKS] SET 
    [Title] = @title, [Summary] = @summary, [Note] = @note
    WHERE [Id] = @id`;
    return await pool.request()
    .input('title', sql.NVarChar, Title)
    .input('summary', sql.NVarChar, Summary)
    .input('note', sql.NVarChar, Note)
    .input('id', sql.Int, Id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const UpdateTask_Done = async (req, res, next) => {
    const {id} = req.params
    const pool = await sqlConnection;
    const queryString = `UPDATE [TASKS] SET 
    [TaskStatus] = @taskStatus
    WHERE [Id] = @id`;
    return await pool.request()
    .input('taskStatus', sql.Int , 1)     
    .input('id', sql.Int, id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const UpdateTask_NotDone = async (req, res, next) => {
    const {id} = req.params
    const pool = await sqlConnection;
    const queryString = `UPDATE [TASKS] SET 
    [TaskStatus] = @taskStatus
    WHERE [Id] = @id`;
    return await pool.request()
    .input('taskStatus', sql.Int , 0)    
    .input('id', sql.Int, id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const UpdateTask_Postponed = async (req, res, next) => {
    const {id} = req.params
    const pool = await sqlConnection;
    const queryString = `UPDATE [TASKS] SET 
    [TaskStatus] = @taskStatus, [IsDone] = @isDone
    WHERE [Id] = @id`;
    return await pool.request()
    .input('taskStatus', sql.Int , 2)
    .input('isDone', sql.Bit, 0)    
    .input('id', sql.Int, id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const UpdateTask_MoveToDay = async (req, res, next) => {
    const {Id, TaskDay} = req.body;
    const pool = await sqlConnection;
    const queryString = `UPDATE [TASKS] SET 
    [TaskDay] = @taskDay
    WHERE [Id] = @id`;
    return await pool.request()
    .input('taskDay', sql.Date , TaskDay)    
    .input('id', sql.Int, Id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}

export const DeleteTask = async (req, res, next) => {
    const {id} = req.params
    const pool = await sqlConnection;
    const queryString = `DELETE FROM [TASKS] 
    WHERE [Id] = @id`;
    return await pool.request()       
    .input('id', sql.Int, id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, null, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })
}