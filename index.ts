import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';
const server = new Server();
// body parser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());
// configurar CORS
server.app.use(cors({origin: true, credentials: true}));
// rutas de servicios
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
})
