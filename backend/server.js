const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');
const port = 3306;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

 // const pool = mysql.createPool({
 //     host: process.env.DB_HOST,
 //     user: process.env.DB_USER,
 //     password: process.env.DB_PASSWORD,
 //     database: process.env.DB_DATABASE,
 //     waitForConnections: true,
 //     connectionLimit: 10,
 //     queueLimit: 0
 // })
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
   
})

// pool.getConnection((err,con)=>{
// if(err) console.log(err);
// console.log('conexion funcionando!');
// })


app.get('/', (re,res)=>{
    const sql = "SELECT * FROM usuarios";
    db.query(sql, (err,data)=>{
        if(err) return res.json(err);
         return res.json(data);
    })
})
app.post('/create',(req,res)=>{
    
    
    const sql = " INSERT INTO `usuarios` ( `nombre`, `apellido`,  `email`, `membresia`, `stado`, `vencimiento`, `horas`,`entrada`, `salida`) VALUES (?);"
    const values = [
      req.body.nombre,
      req.body.apellido,
      req.body.email,
      req.body.membresia,
      req.body.stado,
      req.body.vencimiento,
      req.body.horas,
      req.body.entrada,
      req.body.salida,
    ];
    console.log(values)
    db.query(sql, [values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Creando..");
    })
   
})
app.put('/update', (req,res)=>{
    const sql = "UPDATE `usuarios` SET `nombre` = ?, `apellido` = ?, `email` = ?, `stado` = ?, `vencimiento` = ? , `horas` = ? WHERE `usuarios`.`id` = ?;";
    const id = req.body.id;
    const values = [
        req.body.nombre,
     req.body.apellido,
     req.body.email,
     req.body.stado,
     req.body.vencimiento,
    req.body.horas,
    ]
    
     console.log(values)



    db.query(sql,[...values,id ],(err,data)=>{
        if(err) return res.json(err);
        return res.json('Datos modificados!');
    })
})

app.get('/',(re,res)=>{
    return res.json("From backend");
})

app.delete('/', (req,res)=>{
const sql = "DELETE FROM `usuarios` WHERE `usuarios`.`id` = ?"

db.query(sql,[req.body.id],(err,data)=>{
    if(err) return res.json(err);
    return res.json("eliminando..");
})
})

app.put('/serch',(req,res)=>{

const sql = "SELECT * FROM `usuarios` WHERE nombre OR apellido = ?;"
const values = [
    req.body.serch,
]
console.log(values);
db.query(sql,[...values],(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
})
})

app.get('/Pago',(req,res)=>{

    const sql = "SELECT * FROM `usuarios` WHERE usuarios.stado = 'Pago';"

    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
    })

    app.get('/Inpago',(req,res)=>{

        const sql = "SELECT * FROM `usuarios` WHERE usuarios.stado = 'Inpago';"
    
        db.query(sql,(err,data)=>{
            if(err) return res.json(err);
            return res.json(data);

        })
        })

        app.get('/bono-mensual-medium',(req,res)=>{

            const sql = "SELECT * FROM `usuarios` WHERE usuarios.membresia = 'bono mensual medium';"
        
            db.query(sql,(err,data)=>{
                if(err) return res.json(err);
                return res.json(data);
                
            })
            })

            app.get('/bono-mensual-basico',(req,res)=>{

                const sql = "SELECT * FROM `usuarios` WHERE usuarios.membresia = 'bono mensual basico';"
            
                db.query(sql,(err,data)=>{
                    if(err) return res.json(err);
                    return res.json(data);
                    
                })
                })

                app.get('/bono-bicho-feo',(req,res)=>{

                    const sql = "SELECT * FROM `usuarios` WHERE usuarios.membresia = 'bono bicho feo';"
                
                    db.query(sql,(err,data)=>{
                        if(err) return res.json(err);
                        return res.json(data);
                        
                    })
                    })

                    app.get('/taller-intensivo',(req,res)=>{

                        const sql = "SELECT * FROM `usuarios` WHERE usuarios.membresia = 'taller intensivo';"
                    
                        db.query(sql,(err,data)=>{
                            if(err) return res.json(err);
                            return res.json(data);
                            
                        })
                        })

                        app.get('/bono-semanal',(req,res)=>{

                            const sql = "SELECT * FROM `usuarios` WHERE usuarios.membresia = 'bono semanal';"
                        
                            db.query(sql,(err,data)=>{
                                if(err) return res.json(err);
                                return res.json(data);
                                
                            })
                            })
    
                            app.get('/bono-diario',(req,res)=>{

                                const sql = "SELECT * FROM `usuarios` WHERE usuarios.membresia = 'bono diario';"
                            
                                db.query(sql,(err,data)=>{
                                    if(err) return res.json(err);
                                    return res.json(data);
                                    
                                })
                                })

  

       
        

app.listen(port,()=> console.log('server is running! '));


// module.exports = pool.promise();
