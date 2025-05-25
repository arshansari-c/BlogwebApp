import mongoose from "mongoose"

export const mongodb = async()=>{
    try {
      await  mongoose.connect(process.env.MONGODB_URI)
        console.log("Databse connect succesfully")
    } catch (error) {
        console.log("mongodb error",error)
    }
}