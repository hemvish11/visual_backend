require('dotenv').config()
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }))

// app.use(cors({ origin: 'http://localhost:5173' }))
app.use(cors())


// mongoose.connect("mongodb://localhost:27017/visualizationDB");
mongoose.connect(process.env.MONGO_URL);



const visualSchema = new mongoose.Schema({
    _id: String,
    end_year: Number,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
})

const Visual = mongoose.model("Visual", visualSchema);

app.get('/', (req, res) => {
    res.send("yo");
})

// REST API 
app.get('/alldata', async (req, res) => {
    try {
        let data = await Visual.find({});
        res.json(data);
    } catch (error) {
        throw error;
    }
})

app.get('/alldata/:key', async (req, res) => {
    try {
        let suffix = req.params.key;
        let data = await Visual.find({}).select(`title ${suffix}`);
        res.json(data);
    } catch (error) {
        throw error;
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server chalu h...Jaao dhoom machao...`);
});