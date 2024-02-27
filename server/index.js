require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.ATLAS_URI;

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(url, {
    useNewUrlParser: true,
}).then(() => {
    console.log('MongoDB connected!')
}).catch((err) => {
    console.log('MongoDB error: ' + err)
});

app.get('/', (_, res) => {
    res.json({ name: 'Node.js Server!' })
});
app.use('/api', routes);

app.listen(PORT, console.log('Server running on PORT: ' + PORT));