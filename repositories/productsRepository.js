var sql = require('mssql');
var queryReader = require('./queryReader');

var queryReader = new queryReader();
function productRepository() {
    this.connection = require('./dataBaseConfig').conn_str;
    this.getProducts = function (callback) {
        var connection = new sql.Connection(this.connection, function (err) {
            var query = queryReader.getContent('getproducts');
            var request = new sql.Request(connection); // or: var request = connection.request();
            request.query(query , function (err, recordset) {
                callback(recordset);
                console.dir(recordset);
            });
        });
    }
    this.getProductById = function (Id, callback) {

        sql.connect(this.connection).then(function() {
            var query = queryReader.getContent('getproductById');
            new sql.Request()
                .input('Id', sql.Int, Id)
                .query(query).then(function(recordset) {
                callback(recordset);
            }).catch(function(err) {
                // ... execute error checks
            });
        }).catch(function(err) {
            console.log(err);
        });
    }
    this.setProduct = function (productModel,callback) {
        var connection = new sql.Connection(this.connection, function (err) {
            var query = queryReader.getContent('setproducts');

            var request = new sql.Request(connection); // or: var request = connection.request();
            request
                .input('Name',sql.VarChar(50),productModel.Name)
                .input('SubCategoryId',sql.Int,productModel.SubCategoryId)
                .query(query, function (err, recordset,affected) {
                console.log(err,recordset,affected);
                callback(affected);

            });
        });
    }
    this.getSubCategoriesByCategoryId = function (categoryId,callback) {
        var connection = new sql.Connection(this.connection, function (err) {
            var query = queryReader.getContent('getsubcategegoriesBycategoryId');
            console.log(query)
            var request = new sql.Request(connection); // or: var request = connection.request();
            request
                .input('CategoryId',sql.Int,categoryId)
                .query(query, function (err, recordset) {
                callback(recordset);

            });
        });
    }
    this.getCategories = function (callback) {
        var connection = new sql.Connection(this.connection, function (err) {
            var query = queryReader.getContent('getcategories');
            console.log(query)
            var request = new sql.Request(connection); // or: var request = connection.request();
            request.query(query, function (err, recordset) {
                // ... error checks
                callback(recordset);

            });


        });
    }
};
module.exports = productRepository;
