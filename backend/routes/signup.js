import express from 'express';

import db from '../db/connection.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = req.body

        const existingUser = await db.collection('mmrlUsers').findOne({email})

        let collection = await db.collection('mmrlUsers');
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
        } catch(err){
            
        }
    })