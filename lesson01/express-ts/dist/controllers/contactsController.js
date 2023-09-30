import dotenv from "dotenv";
import { MongoClient, ObjectId } from 'mongodb';
dotenv.config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
async function getAll() {
    try {
        const myDB = client.db("cse-341");
        const myColl = myDB.collection("contacts");
        const data = await myColl.find({}).toArray();
        return data;
    }
    finally {
        await client.close();
    }
}
async function getOne(id) {
    try {
        const myDB = client.db("cse-341");
        const myColl = myDB.collection("contacts");
        const query = { _id: new ObjectId(id) };
        const data = await myColl.findOne(query);
        return data;
    }
    finally {
        await client.close();
    }
}
async function addOne(bodyData) {
    try {
        const myDB = client.db("cse-341");
        const myColl = myDB.collection("contacts");
        const query = bodyData;
        const data = await myColl.insertOne(query);
        return data;
    }
    finally {
        await client.close();
    }
}
async function updateOne(id, bodyData) {
    try {
        const myDB = client.db("cse-341");
        const myColl = myDB.collection("contacts");
        const query = { _id: new ObjectId(id) };
        const data = await myColl.updateOne(query, { $set: { ...bodyData } });
        return data;
    }
    finally {
        await client.close();
    }
}
async function deleteOne(id) {
    const myDB = client.db("cse-341");
    const myColl = myDB.collection("contacts");
    const query = { _id: new ObjectId(id) };
    const data = await myColl.deleteOne(query);
    return data;
}
export const contactsController = async (req, res) => {
    const method = req.method;
    const body = req.body;
    const header = req.query.id;
    switch (method) {
        case "GET":
            if (header) {
                try {
                    await client.connect();
                    let data = await getOne(header);
                    res.json({ status: 200, data: data });
                }
                catch (e) {
                    res.json({ status: 500, message: `Error connecting${e}` });
                }
            }
            else {
                try {
                    await client.connect();
                    let data = await getAll();
                    res.json({ status: 200, data: data });
                }
                catch (e) {
                    res.json({ status: 500, message: `Error connecting${e}` });
                }
            }
            break;
        case "POST":
            try {
                await client.connect();
                let objId = await addOne(body);
                res.status(201).json({ objectId: objId.insertedId });
            }
            catch (e) {
                res.status(500).json({ message: `Error inserting${e}` });
            }
            break;
        case "PUT":
            try {
                await client.connect();
                let returnedData = await updateOne(header, body);
                res.status(200).json({ acknowledged: returnedData.acknowledged, modifiedCount: returnedData.modifiedCount });
            }
            catch (e) {
                res.status(500).json({ message: `Error updating${e}` });
            }
            break;
        case "DELETE":
            try {
                await client.connect();
                let returnedData = await deleteOne(header);
                res.status(204).json({ acknowledged: returnedData.acknowledged, deletedCount: returnedData.deletedCount });
            }
            catch (e) {
                res.status(500).json({ message: `Error deleteing${e}` });
            }
            break;
    }
};
//# sourceMappingURL=contactsController.js.map