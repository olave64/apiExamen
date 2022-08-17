const express = require('express');
const cors = require('cors');
//const eliminarProducto = require('./controller/productos.controler');
const routerProductos = require('./routs/rutas.routs')
const dbConnect = require('./connect/sqlserver');

//const crearProducto = require('./controller/query')

const app = express();
app.use(cors());
app.use(express.json());

dbConnect();
app.use('/api', routerProductos);

app.listen(3000,()=>{
    console.log('servidor corriendo ')
})