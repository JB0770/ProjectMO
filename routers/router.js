const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index',
    {imagdocumento: '/imags/documents.jpg',
    imagexperto:'/imags/experts.jpg',
    imagexposicion:'/imags/exposicion.jpg',
    activePage: 'index'});
  });

  module.exports =router;