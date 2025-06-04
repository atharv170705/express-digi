import 'dotenv/config'

import express from 'express'

const app = express();
const port = process.env.PORT || 2000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newTea = {id : nextId++, name, price};
    teaData.push(newTea);
    res.status(200).send(newTea); 
});


// get all teas
app.get('/teas', (req, res) => {
    res.status(201).send(teaData);
});

// get a tea with specific id
app.get('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const tea = teaData.find(t => t.id === teaId);
    if(!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
});


// update tea
app.put('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const tea = teaData.find(t => t.id === teaId);
    if(!tea) {
        return res.status(404).send("Tea not found");
    }
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});


// delete tea
app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const index = teaData.findIndex(t => t.id === teaId);
    if(index === -1) {
        return res.status(404).send("Tea not found");
    }
    teaData.splice(index, 1);
    res.status(200).send("Tea deleted");
});

app.listen(port, () => {
    console.log(`Server is listening at port : ${port}`);
});