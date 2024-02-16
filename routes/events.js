/*
    Rutas de Eventos Calendar
    host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Validar token JWT para todas las rutas
router.use( validarJWT );

router.get('/', 
    [ // middlewares
    ],
    getEventos );

router.post('/', 
    [ // middlewares
        check('title', 'El titulos es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').not().isEmpty(),
        check('start', 'La fecha inicio debe tener formato valido').custom( isDate ),
        check('end', 'La fecha de fin es obligatoria').not().isEmpty(),
        check('end', 'La fecha fin debe tener formato valido').custom( isDate ),
        validarCampos,
    ],
    crearEvento );

router.put('/:id', 
    [ // middlewares
        validarCampos,
    ],
    actualizarEvento );

router.delete('/:id', 
    [ // middlewares
    ],
    eliminarEvento );

module.exports = router;