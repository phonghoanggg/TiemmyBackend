const express = require("express");
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send('Helllo bé kakak')
})
console.log("====>", process.env.MONGO_DB)
mongoose.connect(`mongodb+srv://:${process.env.MONGO_DB}@cluster0.vvglb5c.mongodb.net/`)
    .then(() => {
        console.log("Connect DB successs!")
    })
    .catch((err) => {
        console.log(err)
    })
app.listen(port, () => {
    console.log("kakaakak", port)
})