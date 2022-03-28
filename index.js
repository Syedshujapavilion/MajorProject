const express = require('express')
const path = require('path')

app = express();

app.set('template engine', 'html');
app.set('views', path.join(__dirname, 'templates'));
app.use('/static', express.static('static'))

app.get('/', (req, res)=>{
    res.status(200).render('home.pug')
})

app.get('/register', (req, res)=>{
    res.status(200).render('register.pug')
})

app.get('/login', (req, res)=>{
    res.status(200).render('login.pug')
})

app.get('/logout', (req, res)=>{
    res.status(200).render('logout.pug')
})

app.get('/blog-home', (req, res)=>{
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
        }
    ]
    res.status(200).render('blog-home.pug', {})
})

port = 80

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })