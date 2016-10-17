// server connection info
var config = {
    user: 'sa',
    password: 'Volo2020V',
    server: '10.0.1.73', // You can use 'localhost\\instance' to connect to named instance
    database: 'Test',


};

// Here's a complete connection string which can be shared by multiple tests...
module.exports.conn_str = config;