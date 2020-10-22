const { response } = require('express');

const getEventos = async( req,res=response)=>{

    // 5 - Retornar lista de eventos
    // 5.1 - Si necesito rellenar los datos del usuario, utilizamos el metodo populate
    // 5.2 - El primer argumento es la referencia que deseamos rellenar, en este caso es el user
    // 5.3 - Para mostrar unicamente algunas cosas del user, en el segundo argumento, se proporciona, en este caso, solo queremos el name
    const eventos = await Evento.find()
                                .populate('user','name');
    res.json({
        ok:true,
        eventos
    })
}

module.exports={
    getEventos
}