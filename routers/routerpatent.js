const express = require('express');
const routerpatent = express.Router();
const client = require('../database/db');
const controllerpatent = require('../controllers/controllerpatent');


routerpatent.post('/savepatent', controllerpatent.savePatent);
routerpatent.post('/updatepatent/:idpatente', controllerpatent.updatePatent);

function isAuthorized(roles) {
    return (req, res, next) => {
        if (req.session.usuario && roles.includes(req.session.usuario.rol)) {
            next();
        } else {
            res.status(403).send('<script>alert("Acceso denegado"); window.location.href = "/";</script>');
        }
    };
  }
  
  


routerpatent.get('/', async (req, res) => {
    try {
        const results = await client.query('SELECT * FROM patente');
        res.render('indexpatent', {
            results: results.rows,
            logoPath: '/imags/logo-usbmed.png',
            activePage: 'indexpatent'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener las patentes.');
    }
});


routerpatent.get('/updatepatent/:idpatente',  async (req, res) => {
    const idpatente = req.params.idpatente;
    try {
        const patenteResult = await client.query('SELECT * FROM patente WHERE idpatente=$1', [idpatente]);
        const patente = patenteResult.rows[0];
        const detalleResult = await client.query('SELECT * FROM detalle_patente WHERE idpatente=$1', [idpatente]);
        const detalle = detalleResult.rows[0];
        const data = { ...patente, ...detalle };

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los datos de la patente.');
    }
});


routerpatent.get('/deletepatent/:idpatente', isAuthorized(['Administrador']), async (req, res) => {
    const idpatente = req.params.idpatente;
    try {
        await client.query('DELETE FROM detalle_patente WHERE idpatente=$1', [idpatente]);
        await client.query('DELETE FROM patente WHERE idpatente=$1', [idpatente]);
        res.send('<script>alert("Patente eliminada correctamente.");window.location.href = "/indexpatent";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Error al eliminar la patente.");window.location.href = "/indexpatent";</script>');
    }
});

module.exports = routerpatent;
