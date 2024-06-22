const express = require('express');
const routerexpert = express.Router();
const client = require('../database/db');
const crud = require('../controllers/controllerexperto');



// Ruta para guardar un nuevo experto
routerexpert.post('/save', crud.save);
routerexpert.post('/update/:id_experto',  crud.update);




// Ruta para obtener la lista de expertos
routerexpert.get('/', async  (req, res) => {
    try{
      const  results = await client.query('SELECT * FROM experto');
      res.render('indexexpert', {
      results:results,
      logoPath: '/imags/logo-usbmed.png',
      activePage: 'indexexpert'});
    } catch (error) {
            console.error(error);
            res.status(500).send('Error obteniendo la lista de expertos.');
            
        }
    });


// Ruta para obtener los datos de un experto específico para la edición
routerexpert.get('/update/:id_experto', async (req, res) => {
    const id_experto = req.params.id_experto;
    try {
        const expertoResult = await client.query('SELECT * FROM experto WHERE id_experto=$1', [id_experto]);
        const experto = expertoResult.rows[0];
        const detalleResult = await client.query('SELECT * FROM detalle_experto WHERE id_experto=$1', [id_experto]);
        const detalle = detalleResult.rows[0];
        // Combinar los datos en un solo objeto
        const data = { ...experto, ...detalle };
        
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error obteniendo los datos del experto.');
    }
});
// Ruta para obtener los detalles de un experto específico
//routerexpert.get('/detalle/getupdate/:id_experto', detailCrud.getDetail);

routerexpert.get('/delete/:id_experto', async (req, res) => {
  const id_experto = req.params.id_experto;
  try {
    // Elimina primero los detalles del experto
    await client.query('DELETE FROM detalle_experto WHERE id_experto=$1', [id_experto]);
    // Luego elimina el experto
    await client.query('DELETE FROM experto WHERE id_experto=$1', [id_experto]);
    res.send('<script>alert("Experto eliminado correctamente.");window.location.href = "/indexexpert";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<script>alert("Hubo un error al eliminar el experto.");window.location.href = "/indexexpert";</script>');
  }
});

module.exports = routerexpert;
