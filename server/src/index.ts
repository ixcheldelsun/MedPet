import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import mascotasRoutes from './routes/mascotasRoutes';

class Server {
    
    public app: Application

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev')); //para obtener las operaciones con el servidor de GET POST etc en la consola
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false})); //puede borrarse
    }

    routes(): void {
        this.app.use(indexRoutes);
        //recibe la ruta de index
        this.app.use('/usuarios',usuariosRoutes);
        this.app.use('/mascotas',mascotasRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
             console.log('Server on port', this.app.get('port'));    
        });
    }
}

const server = new Server();
server.start();