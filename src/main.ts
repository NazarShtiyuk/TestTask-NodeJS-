import express, { Response, Request } from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import { myDataSource } from './databaseConfig';

import loginRoute from './routes/loginRoute';
import registerRoute from './routes/registerRoute';

const app = express();
const PORT = process.env.PORT || config.get('port');

myDataSource.initialize()
    .then(() => console.log('DB is connected'))
    .catch((e) => console.log(e));

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.static("src"))
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req: Request, res: Response) => {
    res.status(200).render("home");
})
app.use('/login', loginRoute);
app.use('/register', registerRoute);

const server = app.listen(PORT, () => console.log('Server is listining on PORT:', PORT));

