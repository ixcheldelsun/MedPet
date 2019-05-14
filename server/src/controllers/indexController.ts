import { Request, Response } from 'express';

class IndexController {

    public index(req:Request, res: Response) {
        res.json({text: 'API is asdnjg'})
    }
}

export const indexController = new IndexController();