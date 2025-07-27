// lib/mongodb.ts
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI in your .env.local file")
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        dbName: "periodtracker", // Optional: change this to your DB name
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("✅ MongoDB connected")
        return mongoose
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
