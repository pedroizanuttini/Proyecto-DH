const { response } = require('express');
const { validationResult } = require('express-validator');
const fs = require('fs');

const fieldValidator = (req, res=response, next)=>{

    const errors = validationResult( req );

    if( !errors.isEmpty() ){
        // elimino la imagen que se creó
        fs.unlinkSync(req.file.path);

        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }
    
    next();

}

module.exports = {
    fieldValidator,
}