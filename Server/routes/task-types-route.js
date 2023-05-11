import express from 'express';
import {connection as sqlConnection} from '../connect.js';
import sql from 'mssql/msnodesqlv8.js';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Task Types Router');
})
router.get('/get-all', async (req, res, next) => {
    var pool = await sqlConnection;
    var queryString = 'SELECT * FROM [TaskTypes]';
    return await pool.request().query(queryString, (err, data) => {
        console.log(err, data);
        res.json(data);
    })
});

router.get('/get-by-id/:id', async (req, res, next) => {
    var pool = await sqlConnection;
    // var queryString = 'SELECT * FROM [TaskTypes] WHERE [Id] = ' + req.params.id; //SQL Injection
    var queryString = 'SELECT * FROM [TaskTypes] WHERE [Id] = @varId';    
    return await pool.request()
    .input('varId', sql.Int, req.params.id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(data.recordset[0]);
        }else{
            res.send(err);
        }
    })
});

router.post('/create-task-type', async (req, res) => {
    var pool = await sqlConnection;
    const obj = {
        id: 0,
        title: req.body.title,
        description: req.body.description
    };
    var queryString = 'INSERT INTO [TaskTypes] (Title, Description) VALUES(@title, @desc)';
    return await pool.request()
    .input('title', sql.NVarChar, obj.title)
    .input('desc', sql.NVarChar, obj.description)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(data)
        }else{
            res.send(err)
        }
    });    
});

router.put('/update-task-type', async (req, res) => {
    var pool = await sqlConnection;
    const obj = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description
    };
    var queryString = 'UPDATE [TaskTypes] SET [Title] = @title, [Description] = @desc WHERE [Id] = @id';
    return await pool.request()
    .input('title', sql.NVarChar, obj.title)
    .input('desc', sql.NVarChar, obj.description)
    .input('id', sql.Int, obj.id)
    .query(queryString, (err, data) => {
        if(err == null){
            res.json(data)
        }else{
            res.send(err)
        }
    });    
})

export {router as TaskTypeRoute}