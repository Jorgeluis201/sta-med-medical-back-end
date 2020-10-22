const { response } = require('express');

const loginUsuario = async(req, res=response)=>{
    
    // Extraccion de campos de req,body
    const { email, password } = req.body;

    try {
        // Aqui debe ir la consulta de BDD Oracle
        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese email'
            })
        }

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token

        })
  
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }
}

module.exports={
    loginUsuario
}