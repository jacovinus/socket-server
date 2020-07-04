import { Usuario } from "./user";
import { usuariosConectados } from "../sockets/sockets";

export class UsersList {
    private lista: Usuario[] = [];
    constructor() {
    }
    public addUser(usuario: Usuario) {
        this.lista.push(usuario);
        console.log(this.lista)
        return usuario;

    }
    public updateName(id: string, nombre: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('===== actualizando usuario ===== ')
        console.log(this.lista);
    }

    // obtener lista de usuarios conectados
    public getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre')
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id === id)
    }
    // obtener usuarios en una sala en particular
    public getUsuariosEnSala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala)
    }
    // eliminar un usuario de la sala
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id)
        console.log(this.lista, 'usuario borrado')
        return tempUsuario;
    }
}