import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!
if(!MONGODB_URI){
    throw new Error("Define URL in .env")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {ctn : null, promise : null}
}

export async function connectToDatabase(){
    if(cached.ctn){
        return cached.ctn;
    }
    if(!cached.promise){
        cached.promise = mongoose
            .connect(MONGODB_URI)
            .then(() => mongoose.connection)
    }

    try {
        cached.ctn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.ctn;
}