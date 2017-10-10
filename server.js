const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use( (req, resp, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server log');
    }
  });

  next();
});

// app.use( (req,resp, next) => {
//   resp.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );

app.get('/', (req, resp) => {
  resp.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello there'
  });
});

app.get('/about', (req, resp) => {
  resp.render('about', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, resp) => {
  resp.send({
    errorMessage: 'Error handling request'
  });
});

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
