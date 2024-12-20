import { NextFunction, Request, Response } from "express";
import {getFirestore} from "firebase-admin/firestore";
import { NotFoundError } from "../errors/not-found.error";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send( await new UserService().getAll());          
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        res.send(await new UserService().getById(userId));
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        new UserService().save(user);                    
            res.status(201).send({
                message: `Usuário criado com sucesso!`
            });
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
            let user = req.body as User;
            let docref = getFirestore().collection("users").doc(userId);

            if ((await docref.get()).exists) {
                await docref.set({
                    nome: user.nome,
                    email: user.email
                });
                res.send({
                    message: "Usuário alterado com sucesso!"
                });
            } else {
                throw new NotFoundError("Usuário não encontrado!");
            }
    }
    
    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete();        
        res.status(204).end();          
    }
}