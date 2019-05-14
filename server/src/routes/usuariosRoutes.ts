import { Router } from 'express';

import {usuariosController} from '../controllers/usuariosController';

class UsuariosRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', usuariosController.list);
        this.router.get('/:id', usuariosController.getOne);
        this.router.post('/', usuariosController.create);
        this.router.delete('/:id', usuariosController.delete);
        this.router.put('/:id', usuariosController.update);
    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;