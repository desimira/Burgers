const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

let {ObjectId} = require('mongodb')
let {mongoose} = require('./../db/mongoose.js')
let {Burger} = require('./../models/burger')

let app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/burgers', (req, res) => {
    let burger = new Burger({
        type: req.body.type,
        meat: req.body.meat,
        bread: req.body.bread,
        price: req.body.price,
        ingrediants: req.body.ingrediants
    })

    burger.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/burgers', (req, res) => {
    if(_.isEmpty(req.query)){
        Burger.find().then((burgs) => {
            res.send(burgs);
        }, (e) => {
            res.status(400);
        });
    } else if(req.query.meat){
        let meat = req.query.meat;

        Burger.find({meat}).then((burgs) => {
            if(!burgs) {
                return res.status(404).send();
            }
            res.send(burgs);
        }).catch((e) => {
            res.status(404).send();
        })
    } // unfortunately next filetr doesn't work but I think it should be sth similar
    // else if(req.query.price_gt){
    //     let grt = Number(req.query.price_gt);

    //     Burger.find({price: {$gt:grt}}).then((burgs) => {
    //         if(burgs){
    //             return res.status(404).send();
    //         }
    //         res.send(burgs);
    //     }).catch((e) => {
    //         res.status(404).send();
    //     })
    // }
    
});

app.get('/burgers/:id', (req,res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }

    Burger.findById(id).then((burgs) => {
        if(!burgs) {
            return res.status(404).send()
        }
        res.send({burgs});
    }).catch((e) => {
        res.status(404).send();
    })
})

// app.get('/burgers/:meat', (req,res) => {
//     let meat = req.params.meat;

//     Burger.find({meat}).then((burgs) => {
//         if(!burgs) {
//             return res.status(404).send()
//         }
//         res.send({burgs});
//     }).catch((e) => {
//         res.status(404).send();
//     })
// })

app.listen(port, () => {
    console.log('Statred up at port:', port)
});

module.exports = {app}