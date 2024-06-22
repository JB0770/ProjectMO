const client = require('../database/db');

exports.save = async (req, res) => {
    const { nombre, descripcion, especialidad, rol, email, descripcion_detallada, telefono_contacto, estado } = req.body;
    const expertoValues = [nombre, descripcion, especialidad, rol, email];
    try {
        const result = await client.query('INSERT INTO experto (nombre, descripcion, especialidad, rol, email) VALUES ($1, $2, $3, $4, $5) RETURNING id_experto', expertoValues);
        const id_experto = result.rows[0].id_experto;
        const foto = req.file ? req.file.buffer : null;
        const detalleValues = [id_experto, descripcion_detallada, telefono_contacto, foto, estado];
        await client.query('INSERT INTO detalle_experto (id_experto, descripcion_detallada, telefono_contacto, foto, estado) VALUES ($1, $2, $3, $4, $5)', detalleValues);
        res.send('<script>alert("El experto se guardó correctamente"); window.location.href = "/indexexpert";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Error al guardar el experto"); window.location.href = "/indexexpert";</script>');
    }
};

exports.update = async (req, res) => {
    const id_experto = req.params.id_experto;
    const { nombre, descripcion, especialidad, rol, email, descripcion_detallada, telefono_contacto, estado } = req.body;
    const foto = req.file ? req.file.buffer : null;

    const expertoValues = [nombre, descripcion, especialidad, rol, email, id_experto];
    try {
        await client.query('UPDATE experto SET nombre=$1, descripcion=$2, especialidad=$3, rol=$4, email=$5 WHERE id_experto=$6', expertoValues);

        const detalleValues = [descripcion_detallada, telefono_contacto, foto, estado, id_experto];
        await client.query('UPDATE detalle_experto SET descripcion_detallada=$1, telefono_contacto=$2, foto=$3, estado=$4 WHERE id_experto=$5', detalleValues);

        res.send('<script>alert("El experto se actualizó correctamente.");window.location.href = "/indexexpert";</script>');
    } catch (error) {
        console.error(error);
        res.status(500).send('<script>alert("Error al actualizar el experto.");window.location.href = "/indexexpert";</script>');
    }
};
