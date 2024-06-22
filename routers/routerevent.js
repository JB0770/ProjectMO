const express = require('express');
const routerevent = express.Router();
const client = require('../database/db');
const crud = require('../controllers/controllerevento');

routerevent.post('/saveevent', crud.saveevent);

routerevent.get('/', async (req, res) => {
  try {
    const results = await client.query('SELECT * FROM evento');
    res.render('indexevent', { results: results.rows, 
       logoPath: '/imags/logo-usbmed.png',
       activePage: 'indexevent'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener los eventos.');
  }
});



routerevent.get('/updateevent/:id_evento', async (req, res) => {
  try {
    const id_evento = req.params.id_evento;
    const results = await client.query('SELECT * FROM evento WHERE id_evento=$1', [id_evento]);
    if (results.rows.length > 0) {
      res.json(results.rows[0]);
    } else {
      res.status(404).send('Evento no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al obtener el evento.');
  }
});

routerevent.post('/updateevent/:id_evento', crud.updateevent);

routerevent.get('/deleteevent/:id_evento', async (req, res) => {
  try {
    const id_evento = req.params.id_evento;
    await client.query('DELETE FROM evento WHERE id_evento=$1', [id_evento]);
    res.send('<script>alert("Experto eliminado correctamente.");window.location.href = "/indexevent";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al eliminar el evento.');
  }
});

module.exports = routerevent;
