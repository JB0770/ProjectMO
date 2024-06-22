const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const client = require('../database/db');

// Ruta para mostrar la página de inicio de sesión
router.get('/', (req, res) => {
    res.render('indexlogin', {
        logoPath: '/imags/logo-usbmed.png',
        activePage: 'indexlogin'
    });
});

// Ruta para manejar el inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Datos recibidos:', email, password); // Para verificar que los datos se están recibiendo
  try {
      const result = await client.query('SELECT * FROM usuario WHERE email = $1', [email]);
      console.log('Resultado de la base de datos:', result.rows); // Para verificar que la consulta retorna resultados
      if (result.rows.length > 0) {
          const usuario = result.rows[0];
          const match = await bcrypt.compare(password, usuario.password);
          console.log('Comparación de contraseña:', match); // Para verificar si la comparación de contraseñas es correcta
          if (match) {
              res.send('<script>alert("Ingreso correctamente"); window.location.href = "/";</script>');
          } else {
              res.status(401).send('<script>alert("Contraseña incorrecta"); window.location.href = "/indexlogin";</script>');
          }
      } else {
          res.status(404).send('<script>alert("Usuario no encontrado"); window.location.href = "/indexlogin";</script>');
      }
  } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      res.status(500).send('<script>alert("Error del servidor"); window.location.href = "/indexlogin";</script>');
  }
});


module.exports = router;
