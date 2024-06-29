const express = require('express');
const router = express.Router();
const client = require('../database/db');


function isAdmin(req, res, next) {
    if (req.session.usuario && req.session.usuario.rol === 'Administrador') {
        next();
    } else {
        res.status(403).send('<script>alert("Acceso denegado"); window.location.href = "/";</script>');
    }
}


router.get('/', isAdmin, async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM usuario');
        res.render('indexusers', { usuario: result.rows });
    } catch (error) {
        console.error('Error obteniendo la lista de usuarios:', error);
        res.status(500).send('Error obteniendo la lista de usuarios.');
    }
});


router.post('/delete', isAdmin, async (req, res) => {
    const { idusuario } = req.body;
    try {
        await client.query('DELETE FROM usuario WHERE idusuario=$1', [parseInt(idusuario)]);
        res.send('<script>alert("Usuario eliminado correctamente."); window.location.href = "/users";</script>');
    } catch (error) {
        console.error('Error eliminando el usuario:', error);
        res.status(500).send('<script>alert("Error eliminando el usuario."); window.location.href = "/users";</script>');
    }
});


router.post('/edit', isAdmin, async (req, res) => {
    const { idusuario, nombre, email, rol } = req.body;
    try {
        await client.query('UPDATE usuario SET nombre=$1, email=$2, rol=$3 WHERE idusuario=$4', [nombre, email, rol, idusuario]);
        res.send('<script>alert("Usuario actualizado correctamente."); window.location.href = "/users";</script>');
    } catch (error) {
        console.error('Error actualizando el usuario:', error);
        res.status(500).send('<script>alert("Error actualizando el usuario."); window.location.href = "/users";</script>');
    }
});

module.exports = router;
