// import express
const express = require('express');
const app = express();

const path = require('path');

// serve static files
app.use(express.static(__dirname + 'public'));

// set engine with ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// import body-parser
const bp = require('body-parser');

app.use(bp.urlencoded({
    extended: true
}));

app.use(bp.json());

// import firebase
var firebase = require('firebase')

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjt-yGcEuvcEI64mTpyS_OSSzfonEZDrc",
  authDomain: "vote-survey-8635e.firebaseapp.com",
  databaseURL: "https://vote-survey-8635e-default-rtdb.firebaseio.com",
  projectId: "vote-survey-8635e",
  storageBucket: "vote-survey-8635e.appspot.com",
  messagingSenderId: "100494900275",
  appId: "1:100494900275:web:5278e86287d7e92f7bb746",
  measurementId: "G-M4V5PJ1MNX"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.database();
var votingHasil = db.ref('hasil-voting');

// init svariable
let provinceArr = [];

votingHasil.on('value', showData, showError);

function showData(items){
    let provinceTemp = [];
    provinceArr = provinceTemp
    items.forEach((item) => {
        provinceTemp.push([item.val()]);
    })
    visualize();
}

function visualize(){
console.log(provinceArr);
    let daerah = "aceh";
    console.log(provinceArr[0][0][daerah])
    console.log(provinceArr[1][0])
}

function updateData(daerah, puas, puasNas, act){
    let anak = parseInt(provinceArr[0][0][daerah][puas])
    anak = anak + 1
    let nas = parseInt(provinceArr[1][0][puasNas])
    nas = nas + 1
    let kata = act
    console.log("Hi Hello WOrld")
    console.log(anak, nas, kata)
    votingHasil.child(`daerah/${daerah}/${puas}`).set(anak)
    votingHasil.child(`nasional/${puasNas}`).set(nas)
    votingHasil.child(`zword`).push(kata)
}

function showError(err){
    console.log(err);
}


// use bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/static', express.static(path.join(__dirname, 'public')));

//express router
app.get('/', (req, res) =>{
    res.render('index.ejs');
})

app.get('/articles', (req, res) =>{
    res.render('articles.ejs');
})

app.get('/form', (req, res) =>{
    res.render('form.ejs');
})

app.get('/articles/:id', (req, res) => {
    let filename = 'articleList/artikel-' + req.params.id + '.ejs';
    res.render('personal-article.ejs', {id: req.params.id});
})

app.post('/fb', (req, res) => {
    console.log(req.body);
    updateData(req.body['u-province'], req.body['u-satis'], req.body['u-satis-n'], req.body['u-word'])
    res.redirect('/')
})

// server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server runs at port ${PORT}`);
});
