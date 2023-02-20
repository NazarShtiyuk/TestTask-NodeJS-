import express, { Request, Response } from 'express';
const router = express.Router();
import { myDataSource } from '../databaseConfig';
import { User } from '../entity/user.entity';
import * as bcryptjs from 'bcryptjs';
import { City } from '../entity/city.entity';

router.get("/", async (req: Request, res: Response ) => {
    try {
        const countries = await myDataSource.getRepository(City).find();
        
        res.status(200).render("register", {countries});
    } catch (error) {
        const body = req.body;
        body.error = error;
        
        res.status(400).render("register", body)
    }
    
})

router.post(
    "/", 
    async (req: Request, res: Response) => {
    
    try {
        const countries = await myDataSource.getRepository(City).find();
        const { realName, email, login, birthDate } = req.body;
        
        const dataForError = {
            error: 'Unknown error',
            realName,
            email,
            birthDate, 
            login,
            countries,
        };

        if (req.body.password.length < 6 || req.body.password.length > 12) {
            return res.status(401).render("register", {...dataForError, error: "Bad credentials"} );
        } 

        const oldUser = await myDataSource.getRepository(User).findOne({
            where: [
                { email: req.body.email },
                { login: req.body.login },
            ],
        });
        
        if (oldUser) {
            return res.status(404).render("register", {...dataForError, error: "User with this email or login already exists"});
        }
        
        const hashPassword = await bcryptjs.hash(req.body.password, 10);

        const user = await myDataSource.getRepository(User).create(req.body);
        
        const result = await myDataSource.getRepository(User).save({...user, password: hashPassword}); 
        
        res.status(200).render("user", result);
    } catch (error) {
        const body = req.body;
        body.error = error;
        
        res.status(400).render("register", body);
    }
})

export default router;