const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

// Configuración de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(session({
    secret: 'your_secret_key', // Cambia 'your_secret_key' por una clave secreta segura
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
});

// Middleware para verificar si el usuario está autenticado
function isAuthenticated(req, res, next) {
    if (req.session && req.session.usuario) {
        next();
    } else {
        res.redirect('/indexlogin');
    }
}
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); // nombre de la cookie predeterminada en express-session
        res.redirect('/indexlogin');
    });
});


// Rutas
app.use('/indexevent', upload.single('foto'), require('./routers/routerevent'));
app.use('/indexexpert', upload.single('foto'), require('./routers/routerexpert'));
app.use('/indexpatent', require('./routers/routerpatent'));
app.use('/indexlogin', require('./routers/routerlogin'));
app.use('/indexregistro', require('./routers/routerregistro'));
app.use('/users', isAuthenticated, require('./routers/routerusers')); // Asegúrate de que esta línea esté presente
app.use('/', isAuthenticated, require('./routers/router'));

app.listen(5001, () => {
    console.log('Servidor corriendo en http://localhost:5001');
});
