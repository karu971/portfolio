const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
var fs = require('fs');

let dataCompetences = require('./data/competences');
let dataCompetenceTypes = require('./data/competence-type');
let autoIncrementations = require('./data/auto-incrementation.json');

let addedCompetences = [];
let addedCompetenceTypes = [];
// let addedCompetences = [];





const getAllCompetences = (tab1, tab2) => {

    return [...tab1, ...tab2]
}

const getIncrementation = () => {
    var incremFile = './data/auto-incrementation.json';
    const dataIncrementation = JSON.parse(fs.readFileSync(incremFile));
    const newIncrem = { id: dataIncrementation.id + 1 }
    console.log(newIncrem);
    fs.writeFile(incremFile, JSON.stringify(newIncrem), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    return dataIncrementation.id + 1;
}

const getData = (file) => {
    return JSON.parse(fs.readFileSync(file));
}




app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
})

const api = express.Router();

api.get('/incrementation', (req, res) => {
    var incremFile = './data/auto-incrementation.json';
    const dataIncrementation = JSON.parse(fs.readFileSync(incremFile));
    console.log(dataIncrementation);
    res.send(dataIncrementation);
});

api.get('/competences', (req, res) => {
    res.send(dataCompetences);
});

api.post('/add/competences', (req, res) => {
    console.log(req.body)

    const file = './data/competences.json';
    const dataCompetence = getData(file);
    const autoIncrem = getIncrementation();
    const competence = req.body;
    competence.id = autoIncrem;

    addedCompetences = [competence, ...addedCompetences];
    fs.writeFile(file, JSON.stringify(getAllCompetences(dataCompetences, addedCompetences)), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json(competence);
});

api.get('/competence/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const file = './data/competences.json';
    const dataCompetence = getData(file).filter(j => j.id === id)
    if (dataCompetence.length === 1) {
        res.send({success: true, dataCompetence: dataCompetence[0]} );       
    } else {
        res.json({ success: false, message: " Aucune competence" })
    }
});

api.get('/competenceType', (req, res) => {
    res.send(dataCompetenceTypes);
});

api.post('/add/competenceType', (req, res) => {
    const file = './data/competence-type.json';
    const dataCompetenceType = getData(file);
    const autoIncrem = getIncrementation();
    const competenceType = req.body;
    competenceType.id = autoIncrem;

    addedCompetenceTypes = [competenceType, ...addedCompetenceTypes];
    fs.writeFile(file, JSON.stringify(getAllCompetences(dataCompetenceTypes, addedCompetenceTypes)), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.json(competenceType);

})


app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});