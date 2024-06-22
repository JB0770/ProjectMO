const client = require('../database/db');


exports.saveevent = async (req, res) => {
  try {
    const { tipoevento, nombre, fecha, ubicacion } = req.body;
    const foto = req.file ? req.file.buffer : null;
    const values = [tipoevento, nombre, fecha, ubicacion, foto];

    await client.query('INSERT INTO evento (tipoevento, nombre, fecha, ubicacion, foto) VALUES ($1, $2, $3, $4, $5)', values);
    res.send('<script>alert("El evento se guardó correctamente"); window.location.href = "/indexevent";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).send('<script>alert("Hubo un error al guardar el evento.");window.location.href = "/indexevent";</script>');
  }
};

// Definición de la función updateevent
exports.updateevent = async (req, res) => {
  try {
    const id_evento = req.params.id_evento;
    const { tipoevento, nombre, fecha, ubicacion } = req.body;
    const foto = req.file ? req.file.buffer : null;
    const values = [tipoevento, nombre, fecha, ubicacion, foto, id_evento];

    await client.query('UPDATE evento SET tipoevento=$1, nombre=$2, fecha=$3, ubicacion=$4, foto=$5 WHERE id_evento=$6', values);
    res.send('<script>alert("El evento se actualizó correctamente"); window.location.href = "/indexevent";</script>');
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al actualizar el evento.');
  }
};
