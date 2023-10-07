import express from 'express';
import { indexController } from "../controllers/indexController.js";
import { contactsController } from '../controllers/contactsController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' assert { type: 'json' };
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', indexController);
app.all('/contacts', contactsController);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map