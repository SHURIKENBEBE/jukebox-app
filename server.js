const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// const { restore } = require('./models/User');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;
// const router = app.Router();

const hbs = expressHbs.create({helpers});

const sess = {
    secret: 'Super secret secret',
    cooke:{
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


app.use(session(sess));


//set handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// router.get('/', (req, res) => {
//     //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//     res.render('main', {layout : 'index'});
//     });

// router.get('/login', (req, res) => {
//     // login logic 
//     res.render('login');
// });


// router.get('/static', (req, res) => {
//     res.render("static");
// });


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening at http://localhost:${PORT}`));
  });


  // app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.get('/', (req, res) => {
//     //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//     res.render('main', {layout : 'index'});
//     });

