import { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion }from 'mongodb';

dotenv.config()

const uri = process.env.MONGO_URI;
// const contactSchema = new mongoose.Schema({
//      firstName: String,
//      lastName: String,
//      email: String,
//      favoriteColor: String,
//      birthday: String,
//     },{collection:"contacts"})

// const Contact = mongoose.model("Contact",contactSchema);

// const options: ConnectOptions = {
//   dbName: "contacts",
// };

// const connectDB = async () => {
//     await mongoose.connect(uri, options)
// }

// const getAllDocs = async () => {
//     await mongoose.connect(uri, options)
//     Contact.find()
//     .then(doc =>console.log(doc))
//     return "docs"
// }

// const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function getAll() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    const myDB = client.db("cse-341")
    const myColl = myDB.collection("contacts");
    const query = { firstName: 'John' };
    const data = await myColl.find({}).toArray()
    return data
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getOne(id:string) {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      const myDB = client.db("cse-341")
      const myColl = myDB.collection("contacts");
      const query = { firstName: id };
      const data = await myColl.findOne(query)
      return data
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }


export const contactsController = async (req: Request, res: Response) => {
    const header = req.headers['id']
    if(header){
        try{
            await client.connect();
            let data = await getOne(header)
            res.json({status:200, data:data});
        }catch (e){
            res.json({status:500, message:`Error connecting${e}`});
        }

    }else{
        try{
            await client.connect();
            let data = await getAll()
            res.json({status:200, data:data});
        }catch (e){
            res.json({status:500, message:`Error connecting${e}`});
        }
    }
}