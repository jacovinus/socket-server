import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
export default class Server {

public app: express.Application;
public port: number;
private static  _instance: Server;
public io: socketIO.Server;
private httpServer : http.Server;
private constructor(){
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);
    this.listenSockets()
}

public static get instance() {
 return this._instance || (this._instance = new this() );
}
start( callback:any ):void {
    this.httpServer.listen(this.port, callback);
}
listenSockets(){
    console.log('Escuchando conecciones')
    this.io.on("connection",client => {
        console.log('nuevo cliente conectado');
        
    })
}
}