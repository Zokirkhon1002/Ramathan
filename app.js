const exphbs = require("express-handlebars");
const dotenv = require('dotenv');
const path = require("path")
const express = require('express');
const app = express();

// Load env variables
dotenv.config();


// Init middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))


// text writer
app.use("/",require("./routes/textWriter"))



app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine','.hbs');


const PORT = process.env.PORT || 7000;

app.listen(PORT,()=> {
    console.log(`Server running on port: ${PORT}`)
})

