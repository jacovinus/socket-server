import { Socket } from "socket.io"

export const desconectar = ( client: Socket) => {
    client.on('disconnect' ,() => console.log('cliente desconectado'))
}
// Escuchar mensajes
export const mensaje = (client: Socket , io: SocketIO.Server) => {
client.on('mensaje', ( payload: {de: string, cuerpo: string})=> {
console.log('mensaje recibido', payload)
io.emit('mensaje-nuevo', payload)
})
}