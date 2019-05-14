import { Router } from 'express';

import {mascotasController} from '../controllers/mascotasControllers';

class MascotasRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', mascotasController.list);
        this.router.get('/:id', mascotasController.getOne);
        this.router.post('/', mascotasController.create);
        this.router.delete('/:id', mascotasController.delete);
        this.router.put('/:id', mascotasController.update);
    }

}

const mascotasRoutes = new MascotasRoutes();
export default mascotasRoutes.router;