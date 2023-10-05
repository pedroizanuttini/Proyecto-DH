const { response } = require('express');
const { validationResult } = require('express-validator');
const fs = require('fs');

const fieldValidator = (req, res=response, next)=>{
    
    const errors= validationResult( req);
    
    if( !errors.isEmpty()){
        return res.status(422).json({
            ok:false,
            error: errors.mapped()
        });

    };
    
    
    next();

}

module.exports = {
    fieldValidator,
}