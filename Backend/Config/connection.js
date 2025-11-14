import mongoose from 'mongoose';

export const connectDb = async(URL)=>{
    try {
      const connect = await mongoose.connect(URL);
      console.log('Connected to MongoDB');
    } catch (error) {
       console.error(`Not connected to DB : ${error}`);
       process.exit(1);
    }
}
