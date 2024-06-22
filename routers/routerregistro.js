const express = require('express');
const router = express.Router();
const userController = require('../controllers/controlleruser');

// Ruta para mostrar la página de registro
router.get('/', (req, res) => {
    res.render('indexregistro', {
        logoPath: '/imags/logo-usbmed.png',
        activePage: 'indexregistro'
    });
});

// Ruta para manejar el registro de usuarios
router.post('/registro', userController.registro);

module.exports = router;
