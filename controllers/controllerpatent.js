const client = require('../database/db');

exports.savePatent = async (req, res) => {
    const { nombre, tipo_patente, fecha_solicitud, estado_solicitud, descripcion, novedades, nivel_inventivo, aplicacion_industrial, reivindicaciones } = req.body;
    const patenteValues = [nombre, tipo_patente, fecha_solicitud, estado_solicitud];

    try {
        const result = await client.query('INSERT INTO patente (nombre, tipo_patente, fecha_solicitud, estado_solicitud) VALUES ($1, $2, $3, $4) RETURNING idpatente', patenteValues);
        const idpatente = result.rows[0].idpatente;
        const detalleValues = [idpatente, descripcion, novedades, nivel_inventivo, aplicacion_industrial, reivindicaciones];
        await client.query('INSERT INTO detalle_patente (idpatente, descripcion, novedades, nivel_inventivo, aplicacion_industrial, reivindicaciones) VALUES ($1, $2, $3, $4, $5, $6)', detalleValues);
        console.log(nombre, tipo_patente, fecha_solicitud, estado_solicitud,idpatente, descripcion, novedades, nivel_inventivo, aplicacion_industrial, reivindicaciones);  
        res.send('<script>alert("La patente se guardó correctamente"); window.location.href = "/indexpatent";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Error al guardar la patente"); window.location.href = "/indexpatent";</script>');
    }
};

exports.updatePatent = async (req, res) => {
    const idpatente = req.params.idpatente;
    const { nombre, tipo_patente, fecha_solicitud, estado_solicitud, descripcion, novedades, nivel_inventivo, aplicacion_industrial, reivindicaciones } = req.body;
    const patenteValues = [nombre, tipo_patente, fecha_solicitud, estado_solicitud, idpatente];

    try {
        await client.query('UPDATE patente SET nombre=$1, tipo_patente=$2, fecha_solicitud=$3, estado_solicitud=$4 WHERE idpatente=$5', patenteValues);
        const detalleValues = [descripcion, novedades, nivel_inventivo, aplicacion_industrial, reivindicaciones, idpatente];
        await client.query('UPDATE detalle_patente SET descripcion=$1, novedades=$2, nivel_inventivo=$3, aplicacion_industrial=$4, reivindicaciones=$5 WHERE idpatente=$6', detalleValues);
        res.send('<script>alert("La patente se actualizó correctamente"); window.location.href = "/indexpatent";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Error al actualizar la patente"); window.location.href = "/indexpatent";</script>');
    }
};
