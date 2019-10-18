const mysql = require('mysql');
exports.base=(sql,data,callback)=>{
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '654321',
        database : 'htglxt'
    });

    connection.connect();
    connection.query(sql,data,function (err,rows,fields) {
        if(err) throw err;
        callback(rows);
    });
    connection.end();
};
