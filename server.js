// import express
const express = require('express');
const app = express();

const path = require('path');

// serve static files
app.use(express.static(__dirname + 'public'));

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
var votingHasil = db.ref('hasil-vote');

votingHasil.on('value', showData, showError);

function showData(items){
    items.forEach((item) => {
        console.log(item.key, item.val());
    })
}

function showError(err){
    console.log(err);
}


// use bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


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

// server listen
app.listen(3000, ()=>{
    console.log('server runs at port 3000');
});
