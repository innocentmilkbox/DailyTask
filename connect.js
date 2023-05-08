import sql from 'mssql/msnodesqlv8.js';

var config = {
    server: 'DESKTOP-80VIF7S\\SQLEXPRESS', //DESKTOP-80VIF7S\SQLEXPRESS
    user: 'sa2',
    password: 'admin123',
    database: 'DAILY_TASKS_DATABASE',
    driver: 'msnodesqlv8'
}

export const connection = new sql.ConnectionPool(config).connect().then(pool => {
    console.log('Connect to Databae successfully');
    return pool;
}).catch((err) => {
    console.log('Error Connecting to Database')
    console.log(err);
});
