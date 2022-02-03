import { Request, Response } from "express";
import EmailService from "../services/Email";

const users = [
    { name: "Marx", email: "marxborgesmachado@gmail.com"},
]

export default {
    async index(req: Request, res: Response) {
        return res.json(users);
    },

    async create(req: Request, res: Response) {
        const emailService = new EmailService();

        emailService.sendMail({
            to: {name: "Marx", email:"marxborgesmachado@gmail.com"},
            message: {subject: "Bem vindo ao sistema", body: "Seja bem vindo"}
        })
    }
}