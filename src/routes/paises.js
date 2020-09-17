const router= require('express').Router();
const { buscarTodos} = require('../controllers/paises');
router.get("/", buscarTodos);
module.exports=router;