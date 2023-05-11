import {todoListConnection as sqlConnection} from '../connect.js';
import sql from 'mssql/msnodesqlv8.js';
import { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature, ValidateSignature, EmptyRecordSet, ResponseBase } from '../utils/index.js';

export const GetAllUsers = async (req, res, next) => {
    var pool = await sqlConnection;
    var queryString = "SELECT * FROM [USERS]";
    return await pool.request().query(queryString, (err, data) => {
        if(err == null){
            res.json(ResponseBase(true, data.recordset, null));
        }else{
            res.json(ResponseBase(false, null, err));
        }
    });
}

export const GetUserById = async (req, res, next) => {
    var pool = await sqlConnection;
    var queryString = "SELECT * FROM [USERS] WHERE [Id] = @varId";
    return await pool.request()
    .input('varId', sql.Int, req.params.id)
    .query(queryString, (err, data)=>{
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

export const Login = async (req, res, next) => {
    var pool = await sqlConnection;
    //Get User By UserName
    var queryString = "SELECT * FROM [USERS] WHERE [UserName] = @varUsername";
    return await pool.request()
    .input('varUsername', sql.NVarChar, req.body.userName)
    .query(queryString, async (err, data) => {
        if(err == null){
            if(EmptyRecordSet(data)){
                res.json(ResponseBase(false, null, 'Invalid username or password'));
            }else{
                var userData = data.recordset[0];
                // console.log(userData);
                const validation = await ValidatePassword(req.body.password, userData.HashedPassword, userData.Salt)
                if(validation){
                    // const signature = GenerateSignature({
                    //     id: userData.Id,
                    //     userName: userData.UserName,
                    //     displayName: userData.DisplayName,                        
                    // });                    
                    // const t = await ValidateSignature(req);
                    // console.log(t);
                    // res.json(ResponseBase(true, signature, null));
                    res.json(ResponseBase(true, {
                        id: userData.Id,
                        userName: userData.UserName,
                        displayName: userData.DisplayName,                        
                    }, null)); 
                }else{
                    res.json(ResponseBase(false, null, 'Invalid username or password'));
                }
            }
        }else{
            res.json(ResponseBase(false, null, err));
        }
    })   
}

export const SignUp = async (req, res, next) => {
    var pool = await sqlConnection;
    //Checking Existed Username
    var checkingQueryString = 'SELECT * FROM [USERS] WHERE [UserName] = @userName';
    const existedChecking = await pool.request()
    .input('userName', sql.NVarChar, req.body.userName)
    .query(checkingQueryString, async (err, data) => {
        if(data.recordset[0] != null) {
            res.json(ResponseBase(false, null, 'Username already existed'));
            // return;
        }else{
            //Password Hashing
            const salt = await GenerateSalt();
            const hashedPassword = await GeneratePassword(req.body.password, salt);
            //Buffer Object
            var obj = {
                id: 0,
                userName: req.body.userName,
                displayName: req.body.displayName,
                salt: salt,
                hashedPassword: hashedPassword,
                joinDate: new Date(),
                lastOnline: null
            };
            
            var queryString = `INSERT INTO [USERS] 
            (UserName, DisplayName, HashedPassword, Salt, JoinDate, LastOnline) 
            VALUES(@userName, @displayName, @hashedPassword, @salt, @joinDate, @lastOnline)`;
            
            return await pool.request()
            .input('userName', sql.NVarChar, obj.userName)
            .input('displayName', sql.NVarChar, obj.displayName)
            .input('hashedPassword', sql.NVarChar, obj.hashedPassword)
            .input('salt', sql.NVarChar, obj.salt)
            .input('joinDate', sql.DateTime2, obj.joinDate)
            .input('lastOnline', sql.DateTime2, obj.lastOnline)
            .query(queryString, (err, data) => {
                if(err == null){
                    res.json(ResponseBase(true, null, null));
                }else{
                    res.json(ResponseBase(false, null, err));
                }
            })
        }
    });
}

export const LogOut = async (req, res) => {
    var pool = await sqlConnection;
    var currentDateTime = new Date();
    var queryString = "UPDATE [USERS] SET [LastOnline] = @lastOnline WHERE [Id] = @id";
    
    return await pool.request()
    .input('lastOnline', sql.DateTime2, currentDateTime)
    .input('id', sql.Int, req.params.id)
    .query(queryString, (err, daa) => {
        if(err == null){
            res.json(ResponseBase(true, null, null))
        }else{
            res.json(ResponseBase(false, null, err))
        }
    });
}
