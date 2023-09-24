import { Request, Response } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from "dotenv";
import { MongoClient, ObjectId }from 'mongodb';

dotenv.config()

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function getAll() {
  try {
    const myDB = client.db("cse-341")
    const myColl = myDB.collection("contacts");
    const data = await myColl.find({}).toArray()
    return data
  } finally {
    await client.close();
  }
}

async function getOne(id:string) {
    try {
      const myDB = client.db("cse-341")
      const myColl = myDB.collection("contacts");
      const query = { _id: new ObjectId(id) };
      const data = await myColl.findOne(query)
      return data
    } finally {
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