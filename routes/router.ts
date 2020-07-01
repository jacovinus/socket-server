import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
const shortid = require('shortid');

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const server = Server.instance;
    const payload = {
        cuerpo,
        de
    }
    server.io.emit('mensaje-nuevo', payload)
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});

router.post('/usuario', (req: Request, res: Response) => {
   const nombre = req.body.nombre;
   const id = shortid.generate();
   const server = Server.instance;
   const payload = {
       id,
       nombre
   }
   server.io.emit('usuario-nuevo',payload)
   res.json({
       ok: true,
       mensaje: payload
   })
});
router.get('/usuario/:id',(req: Request, res: Response) => {
const id = req.params.id;
const nombre = ''
const setver = Server.instance;
const payload = {
    id,
    nombre
}

})

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload)
    res.json({
        ok: true,
        id,
        cuerpo,
        de
    });
});
// serrvice for getting all the user ids
router.get('/usuarios',(req: Request, res: Response) => {

    const server = Server.instance;
    server.io.clients((err:any, clientes:any) => {
        if(err) {
            res.json({
                of: false,
                err
            })
        }
        return res.json({
            ok: true,
            clientes
        })
    } )
}
)

router.get('/usuarios/detalle',(req:Request, res:Response) => {
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    })
})
export default router;