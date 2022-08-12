import 'dotenv/config'
import mongoose from 'mongoose'

const { mongooseString } = process.env

export const handleDatabase = async () => {
    mongoose
        .connect(mongooseString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => console.log('✅ | connected to mongodb.'))
}
