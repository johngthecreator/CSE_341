import express, { Express, Request, Response } from 'express';
import { indexRoute } from "../controllers/indexRoute.js"

const app: Express = express();
const port = 3000;

app.get('/', indexRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});