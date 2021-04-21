const { text } = require("express");
const express=require("express");
const hbs=require("hbs");
const fs=require("fs");
const port=process.env.PORT || 3000;
var app =express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');



app.use((req,res,next) => {
    now= new Date().toString();
    info=`Date : ${now} : methods: ${req.method} : url: ${req.url}`;
    console.log(info);
    fs.appendFile('server.log',info + "\n",(err)=>{
        if(err){
            console.log("Unble to write to the log file ");
        }

        next();
    });
});

// app.use((req,res,next) => {
//     res.render('maintians',{
//         currentYear:new Date().getFullYear()
//     })
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getYear',()=> new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );
app.get('/home', (req,res) => {
    res.render('home.hbs',{
        pageTitle:"About Page",
        currentYear:new Date().getFullYear(),
        welcomeMessage:"Hello to the home page "

    });

});
app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle:"About Page",
        currentYear:new Date().getFullYear()
    });

});
app.listen(port, () => {
    console.log("server is up on the port" + port);
});