const Ajv = require('ajv');

const ajv = new Ajv();

const mw = schema => (req, res, next) => {
    const validate = ajv.compile(schema);
    const valid = validate(req.body);
            // res.json( 400, {
            //     status: 'validation error!',
            //     errors: validate.errors
            // });

            if (valid) {
                next();
                return;
            }
            const result = { status: 'invalid data', payload: validate.errors};
            res.json(result);    
        };

module.exports = mw;