const mongoose = require('mongoose')

//create Schema
const HouseSchema = mongoose.Schema({
    "_id": Number,
    "address": String,
    "county": String,
    "description": String,
    "price": Number,
    "photo": String  
})


const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index:{unique:true} //add this to mongosh : db.users.createIndex( { "email": 1 }, { unique: true } )
    },

    // email:{type: String, require:true, index: true, unique:true, sparse:true},
    
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male','Female','Rather Not to Say'],
        default: 'Rather Not to Say'
    },
    role: {
        type: String,
        enum: ['customer','realtor'],
        default: 'customer'
    }
})


const EnquirySchema=mongoose.Schema({
    ename:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
        // default: new Date()
    }
})

//map this schema to our collection using model
const Houses=mongoose.model('House',HouseSchema)
const Users=mongoose.model('User',UserSchema)
const Enquiries=mongoose.model('Enquiry',EnquirySchema)
//Models are used to query and save data

//export//I have three models at my schema level
module.exports={Houses,Users,Enquiries}

