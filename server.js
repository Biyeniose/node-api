const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Product = require('./models/productModel')
app.use(express.json())



// routes
app.get('/', (req,res) => { // callback funcs must be used for routes
    res.send('Hello API')
})

app.get('/blog', (req,res) => {
    res.send('Blog')
    console.log('Blog route requested')
})

app.get('/products', async(req,res) => {
    try {
        // interacting with database so we use await
        const products = await Product.find({}); // finds all products
        res.status(200).json(products);
        console.log("GET/products Request: ");
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res) => {
    try { // get the id from the req parameters in url
        // ex: http://localhost:3000/products/65a3e062368b0df39e7a77e3
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        console.log("GET/products/id Request: "+product.name);
    } catch(error) {
        //console.log(error)
        res.status(404).json({message: error.message})
    }

})

app.post('/products', async (req, res) =>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch(error){
        console.log(error.message);
        res.status(404).json({message: error.message})
    }
})

// PUT for updating a record
// need async functions for accessing the database
app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){ // no product found
            return res.status(404).json({message: `cannot find a product with ID ${id}`})
        } 
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        console.log("PUT/products/id Request: updated Product = "+ updatedProduct);

    } catch(error){
        res.status(404).json({message: error.message})
    }
})

// delete route
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){ // no product found
            return res.status(404).json({message: `cannot find a product with ID ${id}`})
        } 
        res.status(200).json(product);

    } catch(error){
        res.status(404).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://admin:admin@cluster0.wmwmpf3.mongodb.net/node-api?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, () => { // this is a callback function
        console.log('Node API is running on Port 3000')
    })
    console.log('Connected to mongodb')
}).catch((error) => {
    console.log(error)
})
