const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const homeRouter = require('./controllers/home').router;
const roomRouter = require('./controllers/room').router;

const app = express();
const PORT = 8080;

// Set up Handlebars as the view engine
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'layout' }));
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get('/', require('./controllers/home').getHome);
app.use('/', homeRouter);
app.use('/', roomRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
