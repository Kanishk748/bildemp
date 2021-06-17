const mongoose = require('mongoose')
let ConsultancySchema = new mongoose.Schema({
    consultancy_id:{type:String, required:true},
    name :String,
    website_url:String,
    mission:String,
    specializations:String,
    description:String,
    audience_id:String,
    certifications:String,
    tools:String
})
module.exports = mongoose.model('Consultancy', ConsultancySchema)