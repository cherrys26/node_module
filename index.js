const Joi = require('joi');
const express = require('express');
const app = express();
const cors = require("cors")
app.use(cors())

app.use(express.json());

const product = require('./products.json');
const category = require('./categorys.json');

app.get('/', (req, res) => {
    res.send(product);
});

app.get('/api/products', (req, res) => {
    res.send(product);
});

app.get('/api/products/:id', (req, res) => {
    const products = product.items.find(p => p.id === (req.params.id));
    if (!products) return res.status(404).send('The product with the given id was not found.');
    res.send(products);
});

app.post('/api/products', (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const product = {
        id: product.length + 1,
        title: req.body.title,
    };
    product.push(product);
    res.send(product);
});

app.put('/api/products/:id', (req, res) => {
    const product = product.find(c => c.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('The product with the given ID was not found.');

    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    product.title = req.body.title;
    product.price = req.body.price;
    res.send(product);

});

app.delete('/api/products/:id', (req, res) => {
    const product = product.find(c => c.id === parseInt(req.params));
    if (!product) return res.status(404).send('The product with the given ID was not found.');

    const index = product.indexOf(product);
    product.splice(index, 1);
    res.send(product);
});

function validateProduct(product) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(product, schema);

};



app.get('/api/categorys', (req, res) => {
    res.send(category)
});

app.get('/api/categorys/:category', (req, res) => {
    const cat = product.items
    const categorys = cat.filter(c => c.category === (req.params.category));
    if (!categorys) return res.status(404).send('The category was not found.');
    res.send(categorys);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

