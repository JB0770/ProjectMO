const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const client = require('../database/db');


router.get('/', (req, res) => {
    res.render('indexlogin', {
        logoPath: '/imags/logo-usbmed.png',
        activePage: 'indexlogin'
    });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await client.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            const usuario = result.rows[0];
            const match = await bcrypt.compare(password, usuario.password);
            if (match) {
                req.session.usuario = usuario;
                res.send('<script>alert("Ingreso correctamente"); window.location.href = "/";</script>');
            } else {
                res.status(401).send('<script>alert("Contraseña incorrecta"); window.location.href = "/indexlogin";</script>');
            }
        } else {
            res.status(404).send('<script>alert("Usuario no encontrado"); window.location.href = "/indexlogin";</script>');
        }
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).send('<script>alert("Debes registrarse "); window.location.href = "/indexlogin";</script>');
    }
});
module.exports = router;
