const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }

)

// here is where we declare the name of the collection
const Product = mongoose.model('Product', productSchema, 'myproducts');

module.exports = Product;