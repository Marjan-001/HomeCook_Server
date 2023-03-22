const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

// import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://homecook:kVkjM5HRditzFIre@cluster0.hmvy7hf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// middleware
app.use(cors());
app.use(express.json());
//database connection
async function dbConnect() {

    try {
        await client.connect();

        console.log("database connected")
    }
    catch (error) {
        console.log(error.name, error.message)
    }
}
dbConnect();
const ServiceCollection = client.db('homecook').collection('services');



//routes

//get 3 services

app.get("/services", async (req, res) => {
    try {
        const cursor = ServiceCollection.find({});
        const service = await cursor.limit(3).toArray();
        res.send({
            success: true,
            message: "successfully get",
            data: service
        })

    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }

})
//get all services
app.get("/services/all", async (req, res) => {
    try {
        const cursor = ServiceCollection.find({});
        const allServices = await cursor.toArray();

        res.send({
            success: true,
            message: "successfully get",
            data: allServices
        })
    }
    catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})


//get specific service details
app.get("/services/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const result = await ServiceCollection.findOne(query);

    res.send({
        success: true,
        data: result,
    });
})
app.listen(5000, () => console.log("server is running"));