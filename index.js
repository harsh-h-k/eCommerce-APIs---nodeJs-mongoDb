require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const routes = require('./routes')
const port = process.env.PORT || 3099 


app.use(bodyParser.urlencoded({ extended: true, }));
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, timeZone, x-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    next();
});

// Setting up connetion with mongoDB 
mongoose.connect(`mongodb+srv://Harsh:${process.env.DB_Password}@cluster0.tickmo8.mongodb.net/capermint?retryWrites=true&w=majority`)
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(`error : ${err}`)
})


app.use("/", routes)

app.listen(port, () => {
    console.log("Listening...");
});