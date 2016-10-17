var express = require('express');
var router = express.Router();
var productModel = require('../repositories/productModel');
var ProductRespositroy =  require('../repositories/productsRepository');
var logger = require('../common/logger');

var repo = new ProductRespositroy();
router.get('/',function (req,res) {
        logger.info('info', 'Hello distributed log files!');
        logger.error("127.0.0.1 - there's no place like home");
        repo.getProducts(function (result) {
            console.log(result);

            res.render('products',products = result);
        });
});
router.get('/details/:id',function (req,res) {
    repo.getProductById(req.params.id,function (result) {
        res.render('productDetail',product = result[0]);
    })
});
router.get('/create',function (req,res) {
    repo.getCategories(function (paramCategories) {
        res.render('createProduct',categores = paramCategories);
    })

});

router.post('/create', function (req, res)
{

    repo.setProduct(req.body,function () {
        console.log(req.body);
        res.send("created");
    });

});
router.get('/getSubCegories/:id',function (req,res) {
       repo.getSubCategoriesByCategoryId(req.params.id,function (result) {
          res.send(result);
       });
});


module.exports = router;