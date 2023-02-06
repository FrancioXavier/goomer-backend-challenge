import express, { NextFunction, Request, Response, Router } from 'express';

const app = express();
const route = Router();

app.use(express.json());

route.get('/', (req:Request, res: Response, next: NextFunction) => {
    res.json({message: "Hello world from Typescript."})
});

app.use(route);

const PORT = 8080;
app.listen(PORT, () => {
    console.log('server on na porta 8080');
})
