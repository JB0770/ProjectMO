const bcrypt = require('bcrypt');
const client = require('../database/db');

exports.registro = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await client.query('INSERT INTO usuario (nombre, email, password, rol) VALUES ($1, $2, $3, $4)', [nombre, email, hashedPassword, rol]);
        res.send('<script>alert("El Usuario se registro correctamente"); window.location.href = "/indexlogin";</script>');
    } catch (error) {
        res.send('<script>alert("El Usuario ya Existe"); window.location.href = "/indexlogin";</script>');
    }
};
