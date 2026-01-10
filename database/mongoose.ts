import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB_URL;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache ;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null }; // Ensure cache is initialized
}

export const connectToDatabase = async () =>{
    if(!MONGODB_URI) throw new Error('Please provide MONGODB_URI or MONGODB_URL in the environment variables'); 
    if(cached.conn) return cached.conn;
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI,{bufferCommands: false});
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error; 
    }

    console.log(`Connected To Database  ${process.env.NODE_ENV} - ${MONGODB_URI}`);
    
}