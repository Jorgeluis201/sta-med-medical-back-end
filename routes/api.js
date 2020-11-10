const apiRoute = require('express').Router();

apiRoute.post('/getUser',(req,res)=>{
    

    console.log("Body: ",req.body);

})

module.exports = apiRoute;