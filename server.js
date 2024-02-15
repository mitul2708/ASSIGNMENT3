/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: __MITUL SHANTILAL DESAI____Student ID: _133998229_ Date: FEB 15, 2024
*
* Published URL: https://muddy-tuna-pocketbook.cyclic.app
*
********************************************************************************/
const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

const HTTP_PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;

  if (theme) {
    legoData.getSetsByTheme(theme).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  } else {
    legoData.getAllSets().then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  }
});


app.get('/lego/sets/:id', (req, res) => {
  const setNum = req.params.id;

  legoData.getSetByNum(setNum).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(404).send(`404 - ${err}`)
  });
});


app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});


legoData.initialize().then(() => {
  app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
}).catch((err) => {
  console.log(err);
});