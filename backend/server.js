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
    console.log(element)
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

let verifyContentType = (contentType) => {
    // test("test: ", contentType)

    switch (contentType) {
        case "basicPage":
            return "./data/basic-page.json";

        case "competenceType":
            return "./data/competence-type.json";

        case "experience":
            return "./data/experiences.json";

        case "competence":
            return "./data/competences.json";

        case "formation":
            return "./data/formations.json";

        case "langue":
            return "./data/langues.json";

        default:
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
    const dataIncrementation = JSON.parse(fs.readFileSync(autoIncrementationsFile));
    test(dataIncrementation)
    res.send(dataIncrementation);
});


api.post('/add/:contentType', (req, res) => {

    test(req.body)
    const contentType = req.params.contentType;
    const getContentTypeData = verifyContentType(contentType)

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


api.post('/edit/:contentType/:id', (req, res) => { // TODO
    const body = req.body;
    const contentType = req.params.contentType; // recupere le Type de contenu
    const contentTypeId = req.params.id; // recupere le Type de contenu
    const getcontentTypeData = verifyContentType(contentType); // recupere l"url du fichier Json du type de contenu

    const getAllData = getData(getcontentTypeData) // recupere toutes les data du type de contenu

    getAllData.findIndex(function (item, i) {
        if (item.id == contentTypeId) {
            getAllData[i] = body

            fs.writeFile(getcontentTypeData, JSON.stringify(getAllData), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });

            // test(getAllData)
            res.send(getAllData);
        }
        else {
            // res.json({ success: false, message: "Erreur dans la saisie" })
        }

    })




});





api.get('/:contentType', (req, res) => {

    const contentType = req.params.contentType;
    const getContentTypeData = verifyContentType(contentType);

    const getAllData = getData(getContentTypeData)

    res.send(getAllData);
});

api.get('/:contentType/:id', (req, res) => {

    const contentType = req.params.contentType; // recupere le Type de contenu
    const contentTypeId = req.params.id; // recupere le Type de contenu
    const getcontentTypeData = verifyContentType(contentType); // recupere l"url du fichier Json du type de contenu

    const getAllData = getData(getcontentTypeData) // recupere toutes les data du type de contenu
    const filterData = getAllData.filter(j => j.id == contentTypeId) // recupere un element du fichier de data a partir de l'id

    if (filterData.length === 1) {
        res.send({ success: true, data: filterData[0] });
    } else {
        res.json({ success: false, message: " Aucune competence" })
    }
});



api.post('/delete/:contentType', (req, res) => {

    const contentType = req.params.contentType; // recupere le Type de contenu
    const getcontentTypeData = verifyContentType(contentType); // recupere l"url du fichier Json du type de contenu

    const body = req.body;
    const id = body.id;
    const getAllData = getData(getcontentTypeData) // recupere toutes les data du type de contenu

    const filterData = getAllData.filter(j => j.id === id) // recupere un element du fichier de data a partir de l'id
    const getIndex = getAllData.indexOf(filterData[0]); // recupere index 
    getAllData.splice(getIndex, 1) // releve l'element souhaité du tableau

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