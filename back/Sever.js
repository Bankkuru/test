let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let products = [  { 'no': 1,'name': "WhiteTshirt" ,'price':250, 'src':'https://cp.lnwfile.com/_/cp/_raw/6j/wn/8k.jpg'},
                  { 'no': 2,'name': "BlackTshirt",'price':250,'src':'https://cp.lnwfile.com/_/cp/_raw/6g/da/u5.jpg'},
                  { 'no': 3,'name': "BlueTshirt",'price':250,'src':'https://cp.lnwfile.com/_/cp/_raw/fa/m1/ga.jpg'}
                  
                ];

router.route('/products')
    // get all products
    .get((req, res) => res.json(products))
    // insert a new product
    .post((req, res) => {
    var product = {};
    product.no = products.length > 0 ? products[products.length - 1].no + 1 : 0;
    product.name = req.body.name
    product.price = req.body.price
    product.src = req.body.src
    products.push(product);
    res.json({ message: 'products created' })
    })
    
router.route('/products/:product_no')
    .get((req, res) => {
        let no = req.params.product_no
        let index = products.findIndex(product => (product.no === +no))
        res.json(products[index])                   // get a product
    })
    .put((req, res) => {                               // Update a product
        let no = req.params.product_no
        let index = products.findIndex(product => (product.no === +no))
        products[index].name = req.body.name;
        products[index].price = req.body.price;
        products[index].src = req.body.src;
        res.json({ message: 'product updated' + req.params.product_no });
    })
    .delete((req, res) => {                   // Delete a product
        let no = req.params.product_no
        let index = products.findIndex(product => product.no === +no)
        products.splice(index, 1)
        res.json({ message: 'product deleted ' + req.params.product_no });
    })


app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen( 8000, () => console.log("Server is running"));