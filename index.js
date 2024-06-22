const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));


app.use('/indexevent', upload.single('foto'), require('./routers/routerevent'));
app.use('/indexexpert', upload.single('foto'), require('./routers/routerexpert'));
app.use('/indexpatent', require('./routers/routerpatent'));
app.use('/indexlogin', require('./routers/routerlogin'));
app.use('/indexregistro', require('./routers/routerregistro'));
app.use('/', require('./routers/router'));

app.listen(5001, () => {
    console.log('Servidor corriendo en http://localhost:5001');
});
