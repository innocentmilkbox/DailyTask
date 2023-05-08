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
})

export {router as TaskTypeRoute}