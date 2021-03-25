const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    ShopName: {
      type: String,
      required: true
    },
    GRANumber:{
        type: String,
        required: true
    },
    LiscenseNumber:{
        type: String,
        required: true
    },
    RenewalDate:{
        type:Date,
        required:true
    },
    ExpiryDate:{
        type:Date,
        required:true
    },
    Area:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:String,
        required:true
    },
    Coordination:{
        type:String,
        required:true
    },
    CertificateValidity:{
        type:String,
        required:true
    },
    Note:{
        type:String,
        required:false
    }
  })

  module.exports = mongoose.model('Shop', shopSchema)