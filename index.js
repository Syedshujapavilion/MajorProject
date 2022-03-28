const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

app = express();

app.set('template engine', 'html');
app.set('views', path.join(__dirname, 'templates'));
app.use('/static', express.static('static'))

app.get('/', (req, res) => {
    res.status(200).render('home.pug')
})

app.get('/register', (req, res) => {
    res.status(200).render('register.pug')
})

app.get('/login', (req, res) => {
    res.status(200).render('login.pug')
})

app.get('/logout', (req, res) => {
    res.status(200).render('logout.pug')
})

app.get('/blog-home', (req, res) => {
    blogs = [
        {
            'title': "Hello1",
            'content': "World1",
            'author': "user1"
        },
        {
            'title': "Hello2",
            'content': "World2",
            'author': "user2"
        },
        {
            'title': "Hello1",
            'content': "World1",
            'author': "user1"
        },
        {
            'title': "Hello2",
            'content': "World2",
            'author': "user2"
        }
    ]
    res.status(200).render('blog-home.pug', {})
})

app.get('/blog/submit', (req, res) => {
    res.status(200).render('blog-submit.pug', {})
})

// APNA NAYA CODE 
const cors = require("cors");
const Axios = require("axios");
app.use(cors());
app.use(express.json());

app.use( bodyParser.json() )
app.use(express.urlencoded());

app.post("/compile", (req, res) => {

    let code = req.body.codeBeta
    let language = req.body.language
    let input = req.body.input

    let data = ({
        "code": code,
        "language": language,
        "input": input
    });

    let config = {
        method: 'post',
        url: 'https://codexweb.netlify.app/.netlify/functions/enforceCode',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    
    Axios(config)
        .then((response) => {
            // res.send(response.data)
            res.status(200).render('compile.pug', {'output':response.data})
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        });
})

app.get('/compile', (req, res) => {
    res.status(200).render('compile.pug', {output : ""})
})

port = 80

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})