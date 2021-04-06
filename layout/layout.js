const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const toolbar = require('./json/toolbar.json');
const top = require('./json/top.json')
const middle = require('./json/middle.json')
const testemonials = require('./json/testemonials.json')
const footer = require('./json/footer.json')

app.get('/footer', (req, res) => {
    res.send(footer);
})

app.get('/toolbar', (req, res) => {
    res.send(toolbar);
})

app.get('/top', (req, res) => {
    res.send(top);
})
app.get('/middle', (req, res) => {
    res.send(middle);
})
app.get('/testemonials', (req, res) => {
    res.send(testemonials);
})

const port = process.env.PORT || 4400;
app.listen(port, () => console.log(`Listening on port ${port}...`));