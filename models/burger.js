const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');


let Burger = mongoose.model('Burger', {
    name: {
        type: String,
        required: [true, 'Name of burger is required and should be unique'],
        trim: true,
        unique: true
    },
    type: {
        type: String,
        required: [true, 'Type of burger is required'],
        trim: true,
        validate: {
            validator: (value) => {
                return validator.isIn(value, ["vegetarian", "non vegetarian"]);
            },
            message: '{VALUE} is not a valid type. Choose between "vegetarian" or "non vegetarian"!'
        }
    },
    meat: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return validator.isIn(value, ["chicken", "pork", "beef", "fish", "mix"]);
            },
            message: '{VALUE} is not provided type of meat. Choose between "chicken", "pork", "beef", "fish" or "mix"!'
        }
    },
    bread: {
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                return validator.isIn(value, ["white", "brown", "oat", "rye", "whole wheat", "baguette", "mixed"])
            },
            message: '{VALUE} is not provided type of bread. Choose between "white", "brown", "oat", "rye", "whole wheat", "baguette" or "mixed"'
        }
    },
    price: {
        type: Number,
        default: null,
        min: 8,
        max: 20
    },
    ingredients: {
        type: [String],
        validate: {
            validator: (value) => {
                return _.every(value, (v) => v.match(/[a-zA-Z -]{4,}/))
            }
        }
    },
    created: {
        type: Date,
        default: new Date
    }
})



module.exports = {Burger};
