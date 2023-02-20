import express, { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { myDataSource } from '../databaseConfig';
import { User } from '../entity/user.entity';
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.status(200).render("login")
});

router.post("/", async (req: Request, res: Response) => {
    try{
        const { loginOrEmail } = req.body;

        const user = await myDataSource.getRepository(User).findOne({
            where: [
                { login: loginOrEmail },
                { email: loginOrEmail },
            ],
        })

        const dataForError = {
            error: "Unknown error",
            loginOrEmail
        }

        if(!user) {
            return res.status(404).render("login", { ...dataForError, error: "User doesn't exists" });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);

        if (!comparePassword) {
            return res.status(404).render("login", { ...dataForError, error: "Bad credentials" });
        }

        res.status(200).render("user", user);
    } catch (e) {
        let body = req.body;
        body.error = e;

        res.status(400).render("login", body)
    }
})

export default router;