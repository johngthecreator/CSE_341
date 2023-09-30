import express from "express";
import { b64Image } from "./b64Image.js";
import cors from "cors"
const app = express();
import { indexRoute } from "./routes/indexRoute.js";
import { professionalRoute } from "./routes/professionalRoute.js";


const cOps = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

app.use(cors(cOps))

const port = 8080

app.get("/", indexRoute)
app.get("/professional", professionalRoute)

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})