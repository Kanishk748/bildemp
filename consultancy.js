const mongoose = require('mongoose')
let ConsultancySchema = new mongoose.Schema({
    consultancy_id:String,
    name :string,
    website_url:string,
    mission:string,
    specializations:string,
    description:string,
    audience_id:string,
    certifications:string,
    tools:string
})
module.exports = mongoose.model('Consultancy', ConsultancySchema)