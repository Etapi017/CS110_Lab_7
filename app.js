const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const homeRouter = require('./controllers/home').router;
const roomRouter = require('./controllers/room').router;

const app = express();
const PORT = 8080;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatroom', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up Handlebars as the view engine
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
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
