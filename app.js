const fastify = require('fastify')
const mongoose = require("mongoose")
const Consultancy = require("./consultancy")
fastify.register(require("./consultancies"))
const app = fastify()

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/consultancies"
/** connect to MongoDB datastore */
try {
    mongoose.connect(mongoUrl)
} catch (error) {
    console.error(error)
}


// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})
