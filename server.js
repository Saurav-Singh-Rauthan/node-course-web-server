const express = require('express')
const hbs = require('hbs');
const fs = require('fs');
const app = express()
const port = 3000

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs')
q
app.use(express.static(__dirname+'/public'))

app.use((req,res,next) => {
    var now = new Date().toString()
    
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err) => {
        if(err){
            console.log(err);
        }
    })
    next()
})

app.use((req,res,next) => {
    res.render('maintainence.hbs')
})

// app.get('/maintainence',(req,res) => {
//     res.render('maintainence.hbs')
// })

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle:'Home Page',
        currentYear:new Date().getFullYear(),
        welcomeMessage:'Hello there welcome to this server'
    })
})
    
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    })
})
app.get('/bad',(req,res) => {
    res.send({
        error:'error handling request'
    })
})
app.listen(port, () => console.log(`Example app listening on port port!`))
