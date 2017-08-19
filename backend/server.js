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


const test = (element) => {
    
    console.log("**********************************");
    console.log( element)
    console.log("**********************************");
}


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

const verifiyContentType = (contentType) => {
    
    switch(contentType){
        case "competenceType" :
        return './data/competence-type.json';
        
        case "competence" :
        return "./data/competences.json";
        
        default :
        console.log("Le type de contenu n'est pas correct")    
    }
    
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

api.post('/add/:contentType', (req, res) => {
    
    const contentType = req.params.contentType; 
    const getContentTypeData = verifiyContentType(contentType)
    
    const body = req.body; 
    body.id = getIncrementation();
    
    const getAllData = JSON.parse(fs.readFileSync(getContentTypeData)) // recupere toutes les data du type de contenu
    
    getNewDatas = [...getAllData, body]; // recupere toutes les datas (olds and new)
    
    fs.writeFile(getContentTypeData, JSON.stringify(getNewDatas), (err) => { // sauvegarde les nouvelles données
        if (err) throw err;
        console.log('The file has been saved!');
    });
    
    res.json(getNewDatas);
});


api.post('/edit/competence', (req, res) => { // TODO
    const competenceEdit = req.body;
    const id = competenceEdit.id;
    console.log(competenceEdit);
    const dataCompetence = getData(dataCompetencesFile)
    const dataCompetenceEdit = dataCompetence.filter(j => j.id === id)
    
    dataCompetenceEdit[0].title = competenceEdit.title
    dataCompetenceEdit[0].type = competenceEdit.type
    dataCompetenceEdit[0].createdDate = competenceEdit.createdDate
    dataCompetenceEdit[0].modifiedDate = competenceEdit.modifiedDate
    dataCompetenceEdit[0].path = competenceEdit.path
    
    addedCompetences = dataCompetence
    
    fs.writeFile(dataCompetencesFile, JSON.stringify(addedCompetences), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    res.json(dataCompetence);
});


api.get('/:contentType/:id', (req, res) => {
    
    const contentType = req.params.contentType; // recupere le Type de contenu
    const contentTypeId = req.params.id; // recupere le Type de contenu
    const getcontentTypeData = verifiyContentType(contentType); // recupere l"url du fichier Json du type de contenu
    
    const getAllData = getData(getcontentTypeData) // recupere toutes les data du type de contenu
    const filterData = getAllData.filter(j => j.id == contentTypeId) // recupere un element du fichier de data a partir de l'id
    
    if (filterData.length === 1) {
        res.send({ success: true, dataById: filterData[0] });
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


api.get('/:contentType', (req,res) => {
    const contentType = req.params.contentType;
    console.log(contentType)
    const getContentTypeData = verifyContentType(contentType);

    const getAllData = getData(contentType)
    
    res.json(getAllData);
    

    // console.log()
});


api.post('/delete/:contentType', (req,res) => {
    
    const contentType = req.params.contentType; // recupere le Type de contenu
    const getcontentTypeData = verifiyContentType(contentType); // recupere l"url du fichier Json du type de contenu
    
    const body = req.body; 
    const id = body.id;
    const getAllData = getData(getcontentTypeData) // recupere toutes les data du type de contenu
    
    const filterData = getAllData.filter(j => j.id === id) // recupere un element du fichier de data a partir de l'id
    const getIndex = getAllData.indexOf(filterData[0]); // recupere index 
    getAllData.splice(getIndex,1) // releve l'element souhaité du tableau
    
    fs.writeFile(getcontentTypeData, JSON.stringify(getAllData), (err) => { // sauvegarde les nouvelles données
        if (err) throw err;
        console.log('The file has been saved!');
    });
    
    res.json(getAllData);
});



app.use('/api', api);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});