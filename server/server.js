const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

let {ObjectId} = require('mongodb')
let {mongoose} = require('./../db/mongoose.js')
let {Burger} = require('./../models/burger')

let app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for curl-based POST queries

app.post('/burgers', async (req, res) => {
    try{
        const body = _.pick(req.body, ['name','type', 'meat', 'bread', 'price', 'ingredients'])
        const burger = await new Burger(body);
    
        const newBurg = await burger.save();
        res.send(newBurg);
    }catch (e) {
        res.status(400).send(e)
    }
});

app.get('/burgers/:id', async (req,res) => {
    try{
        let id = req.params.id;
        if(!ObjectId.isValid(id)){
        return res.status(404).send();
        }
        const burger = await Burger.findById(id);
        if(!burger){
            return res.status(404).send();
        }
        res.send(burger);
    }catch(e){
        res.status(400).send();
    }
})

app.get('/burgers', async (req, res) => {
    if(_.isEmpty(req.query)){
        try{
            const burgers = await Burger.find();
            res.send(burgers);
        }catch(e){
            res.status(400);
        }
        return;
    }

    if(req.query.name){
        try{
            let name = req.query.name;
            const burger = await Burger.find({name});
            if(!burger) {
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send();
        }        
        return;
    }

    if(req.query.type){
        try{
            let type = req.query.type;
            const burger = await Burger.find({type});
            if(!burger) {
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send();
        }        
        return;
    }
    
    if(req.query.meat){
        try{
            let meat = req.query.meat;
            const burger = await Burger.find({meat});
            if(!burger) {
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send();
        }        
        return;
    }

    if(req.query.bread){
        try{
            let bread = req.query.bread;
            const burger = await Burger.find({bread});
            if(!burger) {
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send();
        }        
        return;
    }

    if(req.query.price_gt){
        try{
            let grt = Number(req.query.price_gt);
            const burger = await Burger.find({price: {$gte:grt}});
            if(!burger) {
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send();
        }
        return;
    }

    if(req.query.price_lt){
        try{
            let lwt = Number(req.query.price_lt);
            const burger = await Burger.find({price: {$lte:lwt}});
            if(!burger) {
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send();
        }
        return;
    }

    if(req.query.ingredients){
        try{
            let ingrids = req.query.ingredients.split(',');
            const burger = await Burger.find({ingredients: {$all:ingrids}});
            if(!burger){
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send()
        }
    }

    if(req.query.created_bf){
        try{
            let date = req.query.created_bf;
            const burger = await Burger.find({"created": {"$lt":new Date(date)}})
            if(!burger){
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send()
        }
    }

    if(req.query.created_af){
        try{
            let date = req.query.created_af;
            const burger = await Burger.find({"created": {"$gt":new Date(date)}})
            if(!burger){
                return res.status(404).send()
            }
            res.send(burger)
        }catch(e){
            res.status(400).send()
        }
    }
});

app.listen(port, () => {
    console.log('Started up at port:', port)
});

module.exports = {app}