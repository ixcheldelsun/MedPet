import { Request, Response } from 'express';

import pool from '../database';

class UsuariosController {


    public async list(req: Request, res:Response) {
        const usuarios = await pool.query('SELECT * FROM USUARIO');
        res.json(usuarios);
    }

    public getOne(req: Request, res:Response) {
        res.json({text:'este es el usuario' + req.params.id});
    }

    public async create(req: Request, res:Response): Promise<void> {
        await pool.query('INSERT INTO USUARIO set ?', [req.body]);
        res.json({message:'usuario guardado'});
    }

    public delete(req: Request, res:Response) {
        res.json({text:'eliminando un usuario'});
    }

    public update(req: Request, res:Response) {
        res.json({text:'actualizando un usuario' + req.params.id});
    }
}
export const usuariosController = new UsuariosController();
