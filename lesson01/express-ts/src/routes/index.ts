import express, { Express } from 'express';
import { indexController } from "../controllers/indexController.js"
import { contactsController } from '../controllers/contactsController.js';

const app: Express = express();
const port = 3000;

app.get('/', indexController);
app.get('/contacts', contactsController);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});