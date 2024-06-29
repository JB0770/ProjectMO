const express = require('express');
const router = express.Router();
const userController = require('../controllers/controlleruser');


router.get('/', (req, res) => {
    res.render('indexregistro', {
        logoPath: '/imags/logo-usbmed.png',
        activePage: 'indexregistro'
    });
});


router.post('/registro', userController.registro);

module.exports = router;
