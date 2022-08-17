const dbConnect = require('../connect/sqlserver')
const sql = require('mssql');
const { response, request } = require('express');



// ----------------------CONSULTAR TODOS LOS PRODUCTOS------------------------

 const getProductos = async (req = request, res = response) =>{
    try {
        const listaProducto = await sql.query('select * from Productos')
        
        res.json({
            ok:true,
            lista: listaProducto.recordset
        })
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error en la transaccion'
        });
    }
}

//-----------------INSERTAR UN NUEVO PRODUCTO---------------------------------
const insertarProducto = async(req= request, res= response)=>{
    console.log('entrando a insertar producto')
    
    const nombre = req.query.nombreProducto;
    const cantidad = req.query.cantidadProducto;
    const tipo = req.query.tipoProducto;
    console.log({
        nombre,
        cantidad,
        tipo
    })
    try {
       const insertar =  await sql.query("insert into Productos (Nombre,Cantidad,Tipo) values ( '"+nombre+"',"+cantidad+",'"+tipo+"')")
       res.json({
           ok: true,
           nuevo_producto: {
               nombre: nombre,
               cantidad: cantidad,
               tipo: tipo,
               msg: 'Producto creado correctamente'
           }
    });
       
    } catch (error) {
        console.log(error);
     res.json({
        ok: false,
        msg: 'Consultar log '
     })
    }
   
}

// ---------------------ACTUALIZAR PRODUCTO--------------------------------
const actualizarProducto = async (req = request, res = response)=>{
    console.log('tratando de actualizar')
    const myId = req.query.id;
    
    console.log('producto verificado')
    const nombre = req.query.nombreProducto;
    const cantidad = req.query.cantidadProducto;
    const tipo = req.query.tipoProducto;
    try {

        const actualizar = await sql.query("UPDATE Productos SET Nombre = '"+nombre+"', Cantidad = "+cantidad+", Tipo = '"+tipo+"' where ID = "+myId+"") 
        console.log(actualizar)
    } catch (error) {
        console.log(error);
        }
    }
    


const eliminarProducto = async (req = request, res = response)=>{
    const myId = req.query.id;
    try {
        const eliminar = await sql.query("DELETE FROM Productos WHERE ID = "+myId+" ")
        res.json({
            ok: true,
            msg: eliminar
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'consulte log'
        })
    }
}

const verificarExiste =  async(req = request, res = response, next)=>{
    
    console.log('verificando')
    const myId = req.query.id;

    try {
        const consulta = await sql.query("SELECT ID from Productos WHERE ID = "+myId+"");
        console.log(consulta.recordset.length)
        if (consulta.recordset.length === 0) {
            res.json({
                ok: true,
                msg: 'articulo no encontrado'
            })

        }
        console.log('articulo encontrado')
        next();
        
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'hay un error en la verificacion'
        })
    }
    
}
module.exports = {eliminarProducto,actualizarProducto, insertarProducto, getProductos,verificarExiste}