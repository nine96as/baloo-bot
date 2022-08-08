import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongooseString = process.env.mongooseString

export const handleDatabase = async () => {
    mongoose
        .connect(mongooseString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log('✅ | connected to mongodb.'))
}