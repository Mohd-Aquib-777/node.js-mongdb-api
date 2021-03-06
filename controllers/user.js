const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('../models/model.js')

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/add', function(req, res) {
    db._insert('users',{
        'username':req.body.user,
        'password':req.body.pswd
    },
    function(err, info){
        if(err) {
            console.log(err)
        }
        var response = req.body;
        response.id = info.insertId
        console.log(response)
        res.send(response)

    })
})

app.post('/fetch', (req, res) => {
    if(typeof req.body.id != 'undefined')
    {
        var UserId = {id:req.body.id};
    } else {
        useId = {};
    }
    db._select('users', ['id','username','password'], UserId, (err, result) =>{
        if(err) {
            console.log(err)
        }
        res.json(result)
    })
})

app.post('/delete', (req, res) => {
    console.log(req.body)
    db._delete('users',{id:req.body.userId}, () => {
        res.json({msg:'recored deleted',
        responseId:req.body.userId
    })
    })
})

module.exports = app
