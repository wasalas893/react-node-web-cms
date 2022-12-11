import Room from "../models/Room.js";
import Hotel from '../models/Hotel.js';
import { createError } from "../utils/error.js";

export const createRoom= async (req,res,next)=>{

    const hotelId=req.params.hotelid;
    const newRoom=new Room(req.body);

    try {
        const saveRoom=await newRoom.save();

        try {
            await Hotel.findOneAndUpdate(hotelId,{$push: {rooms:saveRoom._id},});  
        } catch (err) {
            next(err);           
        }

        res.status(200).json(saveRoom);
        
    } catch (err) {
        next(err);
        
    }


};


export const updateRoom= async (req,res,next)=>{

    try {
        const UpdateRoom= await Room.findByIdAndUpdate(
             req.params.id, 
            { $set: req.body},
            {new:true}
            
            );

        res.status(200).json(UpdateRoom);
        
    } catch (err) {

        next(err);
        
    }

}

export const deleteRoom= async (req,res,next)=>{

    const hotelId=req.params.hotelid;

    try {

        await Room.findByIdAndDelete(req.params.id);

        try {
            await Hotel.findOneAndUpdate(hotelId,{$pull: {rooms:req.params.id},});  
        } catch (err) {
            next(err);           
        }

       res.status(200).json("Room has been deleted.");
       
   } catch (err) {

      next(err);
       
   }

}

export const getRoom= async (req,res,next)=>{

    try {

        const Room= await Room.findById(
             req.params.id, 
            
            
            );

        res.status(200).json(Room);
        
    } catch (err) {

       next(err);
        
    }

}

export const getRooms= async (req,res,next)=>{

    try {

        const Rooms= await Room.find();

        res.status(200).json(Rooms);
        
    } catch (err) {

        next(err);
    }

}