import express from 'express';
import {todoListConnection as sqlConnection} from '../../connect.js';
import sql from 'mssql/msnodesqlv8.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {APP_SECRET} from '../../config.js';
import { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature, ValidateSignature } from '../../utils/index.js';

const router = express.Router();

router.get('/get-all-users', async (req, res, next) => {
    var pool = await sqlConnection;
    var queryString = "SELECT * FROM [USERS]";
    return await pool.request().query(queryString, (err, data) => {
        if(err == null){
            res.json(data);
        }else{
            res.json(err);
        }
    });
});

router.get('/get-by-id', async (req, res, next) => {
    var pool = await sqlConnection;
    var queryString = "SELECT * FROM [USERS] WHERE [Id] = @varId";
    return await pool.request()
    .input('varId', sql.Int, req.params.id)
    .query(queryString, (err, data)=>{
        if(err == null){
            res.json(data);
        }else{
            res.json(err);
        }
    })
});

router.post('/login', async (req, res, next) => {
    var pool = await sqlConnection;
    //Get User By UserName
    var queryString = "SELECT * FROM [USERS] WHERE [UserName] = @varUsername";
    return await pool.request()
    .input('varUsername', sql.NVarChar, req.params.userName)
    .query(queryString, async (err, data) => {
        if(err == null){
            if(data.recordset[0] == null){
                res.json({message: "Invalid username or password"});
            }else{
                var userData = data.recordset[0];
                const validation = await ValidatePassword(req.params.password, userData.salt)
                if(validation){
                    const signature = GenerateSignature({
                        id: userData.id,
                        userName: userData.userName,
                        displayName: userData.displayName,                        
                    });
                    res.json(signature);
                }else{
                    res.json({message: "Invalid username or password"});
                }
            }
        }else{
            res.json(err);
        }
    })    
});

export {router as ToDoListUserRoute}