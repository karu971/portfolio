const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
var fs = require('fs');

let dataCompetencesFile = './data/competences.json';
let dataCompetenceTypesFile = './data/competence-type.json';
let autoIncrementationsFile = './data/auto-incrementation.json';

let dataCompetences = require(dataCompetencesFile);
let dataCompetenceTypes = require(dataCompetenceTypesFile);
let autoIncrementations = require(autoIncrementationsFile);


let addedCompetences = [];
let addedCompetenceTypes = [];
// let addedCompetences = [];





const getAllCompetences = (tab1, tab2) => {

    return [...tab1, ...tab2]
}

const getIncrementation = () => {
    const dataIncrementation = JSON.parse(fs.readFileSync(autoIncrementationsFile));
    const newIncrem = { id: dataIncrementation.id + 1 }
    fs.writeFile(autoIncrementationsFile, JSON.stringify(newIncrem), (err) => {
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
    // var incremFile = './data/auto-incrementation.json';
    const dataIncrementation = JSON.parse(fs.readFileSync(autoIncrementationsFile));
    res.send(dataIncrementation);
});

api.get('/competences', (req, res) => {
    res.send(dataCompetences);
});

api.post('/add/competences', (req, res) => {
    // const file = './data/competences.json';
    const dataCompetence = getData(dataCompetencesFile);
    const autoIncrem = getIncrementation();
    const competence = req.body;
    competence.id = autoIncrem;

    addedCompetences = [competence, ...addedCompetences];
    fs.writeFile(dataCompetencesFile, JSON.stringify(getAllCompetences(dataCompetences, addedCompetences)), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json(competence);
});

api.post('/edit/competence', (req, res) => {
    const competenceEdit = req.body;
    const id = competenceEdit.id;
    const dataCompetence = getData(dataCompetencesFile)
    const dataCompetenceEdit = dataCompetence.filter(j => j.id === id)

    
    // dataCompetenceEdit[0] = competenceEdit
    dataCompetenceEdit[0].title = competenceEdit.title
    dataCompetenceEdit[0].type = competenceEdit.type
    dataCompetenceEdit[0].createdDate = competenceEdit.createdDate
    dataCompetenceEdit[0].modifiedDate = competenceEdit.modifiedDate
    dataCompetenceEdit[0].path = competenceEdit.path


    addedCompetences = dataCompetence

    // const getExistingCompetence = req


    console.log('******************');
    console.log(addedCompetences);

    // editCompetences = [competenceEdit, ...addedCompetences];

    fs.writeFile(dataCompetencesFile, JSON.stringify(addedCompetences), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    // const id = parseInt(req.params.id, 10);
    // const dataCompetence = getData(dataCompetencesFile).filter(j => j.id === id)


    res.json(dataCompetence);
});


api.get('/competence/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const dataCompetence = getData(dataCompetencesFile).filter(j => j.id === id)
    if (dataCompetence.length === 1) {
        res.send({ success: true, dataCompetence: dataCompetence[0] });
    } else {
        res.json({ success: false, message: " Aucune competence" })
    }
});



api.get('/competenceType', (req, res) => {
    res.send(dataCompetenceTypes);
});

api.post('/add/competenceType', (req, res) => {
    const dataCompetenceType = getData(dataCompetenceTypesFile);
    const autoIncrem = getIncrementation();
    const competenceType = req.body;
    competenceType.id = autoIncrem;

    addedCompetenceTypes = [competenceType, ...addedCompetenceTypes];
    fs.writeFile(dataCompetenceTypesFile, JSON.stringify(getAllCompetences(dataCompetenceTypes, addedCompetenceTypes)), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    res.json(competenceType);

});




app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});