const express = require('express');
const router = express();
const upload = require('multer')();
const validMw = require('./valid');

router.get('/', (req, res) => {
    res.render('main');
});

router.post('/test', upload.none(), validMw ({
        type: "object",
        properties: {
            name: { type: "string", minLength:3, maxLength:30 },
            surname: { type: "string", minLength:3, maxLength:50 },
            birthday: { 
                type: "string", 
                minLength:1, 
                maxLength:10,
                pattern: '/^([0-3]\d).([0-1]\d).([1-2]\d\d\d)$/' //регулярка
            }
        },
        required: ['name', 'surname', 'birthday'], //обязательные поля
        additionalProperties: false,
      }), async (req, res) => {
        const { name, surname, birthday} = req.body;
      });   
  
//   const data = {
//     name: 'Lara',
//     surname: 'Ivanova',
//     birthday: '22-12-2022'
//   }

module.exports = router;