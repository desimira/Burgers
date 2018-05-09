let mongoose = require('mongoose');

let Burger = mongoose.model('Burger', {
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    meat: {
        type: String,
        minlength: 4,
        trim: true  
    },
    bread: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        default: null
    },
    ingredients: {
        type: String,
        default: "",
        trim: true
    }
})

module.exports = {Burger};