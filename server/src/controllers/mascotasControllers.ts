import { Request, Response } from 'express';

import pool from '../database';

class MascotasController {


    public async list(req: Request, res:Response) {
        const mascotas = await pool.query('SELECT * FROM MASCOTA');
        res.json(mascotas);
    }

    public getOne(req: Request, res:Response) {
        res.json({text:'esta es la mascota' + req.params.id});
    }

    public async create(req: Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO MASCOTA set ?', [req.body]);
        res.json({message:'mascota guardada'});//mensajes para pruebas
    }

    public delete(req: Request, res:Response) {
        res.json({text:'eliminando una mascota'});
    }

    public update(req: Request, res:Response) {
        res.json({text:'actualizando una mascota' + req.params.id});
    }
}
export const mascotasController = new MascotasController();
