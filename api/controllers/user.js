import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/findUser/:name",async (req,res) => {
    try {
      const users = await User.find({
          name:{$regex:req.params.name,$options:"i"}
      })
      
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error.message)
    }
})
router.get("/findUserById/:id",async (req,res) => {
    try {
     const user = await User.findById(req.params.id)

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error.message)
    }
})

export default router;