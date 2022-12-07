import express from 'express';
import Hotel from '../models/Hotel.js';

const router=express.Router();


//CREATE
router.post("/", async (req,res)=>{


const newHotels=new Hotel(req.body);

    try {

        const saveHotel= await newHotels.save()

        res.status(200).json(saveHotel)
        
    } catch (err) {

        res.status(500).json(err)
        
    }

})


//UPDATE
//DELETE
//GET
//GET ALL


export default router