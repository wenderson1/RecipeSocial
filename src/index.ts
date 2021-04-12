import express from 'express';
import './database/connect'
import routes from './routes';


const app = express();
app.use(express.json());
app.use(routes);

app.listen(3500, () => console.log('Server is started at http://localhost:3000'));

export { app };