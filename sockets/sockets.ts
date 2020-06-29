import { Socket } from "socket.io"
import { UsersList } from "../classes/users-list"
import { Usuario } from "../classes/user";

export const usuariosConectados = new UsersList();

export const conectarCliente = ( client: Socket) => {
const usuario = new Usuario(client.id);
usuariosConectados.addUser(usuario);
}

export const desconectar = (client: Socket) => {
    client.on('disconnect', () => usuariosConectados.borrarUsuario(client.id))

}
// Escuchar mensajes
export const mensaje = (client: Socket, io: SocketIO.Server) => {
    client.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('mensaje recibido', payload)

        io.emit('mensaje-nuevo', payload)
    })
}

export const configurarUsuario = (client: Socket, io: SocketIO.Server) => {
    client.on('configurar-usuario', (payload: { nombre: string }, cb: Function) => {
          usuariosConectados.updateName(client.id, payload.nombre)
        cb({
            ok: true,
            mensaje: `Usuario ${payload.nombre} , configurado`
        })
    })
}
