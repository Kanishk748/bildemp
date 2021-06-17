const fastify = require('fastify')
const mongoose = require("mongoose")
const Consultancy = require("./consultancy")
//fastify.register(require("./consultancies"))
const app = fastify()

const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/consultancies"
/** connect to MongoDB datastore */
try {
    mongoose.connect(mongoUrl)
} catch (error) {
    console.error(error)
}
//read all
app.get("/api/consultancies", (request, reply) => {
    Consultancy.find({}, (err, consultancies) => {
        if (!err) {
            reply.send(consultancies)
        } else {
            reply.send({ error: err })
        }
    })
})

// read by id
app.get("/api/consultancies/:consultancyId", (request, reply) => {
    var consultancyId = request.params.consultancyId
    Consultancy.findById(consultancyId, (err, consultancy) => {
        if (!err) {
            reply.send(consultancy)
        } else {
            reply.send({ error: err })
        }
    })
})

//create
app.post("/api/consultancies", async (request, reply) => {
    var consultancy = request.body
    try{
        const addedConsultancy = await Consultancy.create(consultancy);
        reply.send(addedConsultancy)
    } catch(err){
        console.log('Error',err)
        reply.send({ error: err.message })
    }
    
})

//update
app.put("/api/consultancies/:consultancyId", (request, reply) => {
    var consultancyId = request.params.consultancyId
    var newconsultancyEdit = request.body
    Consultancy.findById(consultancyId, (err, consultancy) => {
        if (!err) {
            consultancy.name = newconsultancyEdit.name
            consultancy.website = newconsultancyEdit.website
            consultancy.mission = newconsultancyEdit.mission
            consultancy.specialization = newconsultancyEdit.specialization
            consultancy.description = newconsultancyEdit.description
            consultancy.audience_id = newconsultancyEdit.audience_id
            consultancy.certifications = newconsultancyEdit.certifications
            consultancy.tools = newconsultancyEdit.tools
            consultancy.save((er, savedconsultancy) => {
                if (!er) {
                    reply.send(savedconsultancy)
                } else {
                    reply.send(er)
                }
            })
        } else {
            reply.send({ error: err })
        }
    })
})
// delete
// app.delete("/api/consultancies/:consultancyId", (request, reply) => {
//     var consultancyId = request.params.consultancyId
//     Consultancy.findById(consultancyId, (err, consultancy) => {
//         if (!err) {
//             consultancy.remove((er) => {
//                 if (!er) {
//                     reply.send("consultancy DELETED")
//                 } else {
//                     reply.send({ error: er })
//                 }
//             })
//         } else {
//             reply.send({ error: err })
//         }
//     })
// })










// /api/consultancies GET - Returns all users in the datastore.
// /api/consultancies/:consultancyId GET - Returns a specific user.
// /api/consultancies POST - Adds a new user.
// /api/consultancies/:consultancyId PUT - Edits a user.
// /api/consultancies/:consultancyId DELETE - Removes a user.


// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})
