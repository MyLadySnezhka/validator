const express = require('express');
const router = express();
const upload = require('multer')();
const Ajv = require('ajv');

router.get('/', (req, res) => {
    res.render('main');
});

router.post('/test', upload.none(), async(req, res) => {
    const schema = {
        type: "object",
        properties: {
            name: { type: "string", minLength:3, maxLength:30 },
            surname: { type: "string", minLength:3, maxLength:50 },
            birthday: { 
                type: "string", 
                minLength:1, 
                maxLength:10,
                pattern: '/^([0-3]\d).([0-1]\d).([1-2]\d\d\d)$/'
            }
        },
        required: ['name', 'surname', 'birthday'], //обязательные поля
        additionalProperties: false,
      };    
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const valid = validate(req.body);
        //if (!valid) console.log(validate.errors);
        if (!valid) {
            const result = { status: 'invalid data', payload: validate.errors};
            res.json(result);
            // res.json( 400, {
            //     status: 'validation error!',
            //     errors: validate.errors
            // });
            return;
        };

    // console.log('it`s work');
    res.json({ status: 'ok' });
});

  
//   const data = {
//     name: 'Lara',
//     surname: 'Ivanova',
//     birthday: '22-12-2022'
//   }

module.exports = router;