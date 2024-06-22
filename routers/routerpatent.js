const express = require('express');
const routerpatent = express.Router();
const client = require('../database/db');
const controllerpatent = require('../controllers/controllerpatent');

// Ruta para guardar una nueva patente
routerpatent.post('/savepatent', controllerpatent.savePatent);
routerpatent.post('/updatepatent/:idpatente', controllerpatent.updatePatent);

// Ruta para obtener la lista de patentes
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

// Ruta para obtener los datos de una patente específica para la edición
routerpatent.get('/updatepatent/:idpatente', async (req, res) => {
    const idpatente = req.params.idpatente;
    try {
        const patenteResult = await client.query('SELECT * FROM patente WHERE idpatente=$1', [idpatente]);
        const patente = patenteResult.rows[0];
        const detalleResult = await client.query('SELECT * FROM detalle_patente WHERE idpatente=$1', [idpatente]);
        const detalle = detalleResult.rows[0];
        // Combinar los datos en un solo objeto
        const data = { ...patente, ...detalle };

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los datos de la patente.');
    }
});

// Ruta para eliminar una patente
routerpatent.get('/deletepatent/:idpatente', async (req, res) => {
    const idpatente = req.params.idpatente;
    try {
        // Elimina primero los detalles de la patente
        await client.query('DELETE FROM detalle_patente WHERE idpatente=$1', [idpatente]);
        // Luego elimina la patente
        await client.query('DELETE FROM patente WHERE idpatente=$1', [idpatente]);
        res.send('<script>alert("Patente eliminada correctamente.");window.location.href = "/indexpatent";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Error al eliminar la patente.");window.location.href = "/indexpatent";</script>');
    }
});

module.exports = routerpatent;
