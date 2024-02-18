const express = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = express.response) => {

    const eventos = await Evento.find({}).populate( 'user', 'name' );

    res.status(200).json({
        ok: 'true',
        eventos,
    });
};

const crearEvento = async (req, res = express.response) => {

    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch ( error ){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }    
};

const actualizarEvento = async (req, res = express.response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try{
        const evento = await Evento.findById( eventoId );

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id',
            });    
        }

        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para modificar ese evento',
            });    
        }

        const nuevoEvento = {
            ...req.body,
            user: uid,
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(200).json({
            ok: 'true',
            evento: eventoActualizado,
        });    

    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }
};

const eliminarEvento = async (req, res = express.response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try{
        const evento = await Evento.findById( eventoId );

        if ( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id',
            });    
        }

        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar ese evento',
            });    
        }

        const eventoActualizado = await Evento.findByIdAndDelete( eventoId, { new: true } );

        res.status(200).json({
            ok: 'true',
            evento: eventoActualizado,
        });    

    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}