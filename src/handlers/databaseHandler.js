import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const { mongooseString } = process.env

export const handleDatabase = async () => {
    mongoose
        .connect(mongooseString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log('✅ | connected to mongodb.'))
}
