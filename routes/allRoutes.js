const express=require('express')
const allRouter=express.Router()
const multer=require('multer')
let getFields=multer()


const {Houses, Users, Enquiries}=require('../models/allSchemas')

//To get all the houses information
allRouter.get("/", async (request, response) => {
    const housesData = await Houses.find({});
    try {
      response.send(housesData);
    } catch (error) {
      response.status(500).send(error);
    }
});

//To store the user data.
allRouter.post("/signup", getFields.none(), async (request, response) => {
    const newuser=new Users(request.body)
    let user=await newuser.save()
    user = user.toObject();
    // console.log(request);
    try {
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

//To authenticate the user
allRouter.post("/login", getFields.none(), async (request, response) => {
    
    let user=await Users.findOne({email:request.body.email,password:request.body.password})
    try {
        if(user)
            response.send(user);
        else
            response.send('Authentication Failed')
    } catch (error) {
        response.status(500).send(error);
    }
});

//To store the enquiry data.
allRouter.post("/register", getFields.none(), async (request, response) => {
    const newEnquiry=new Enquiries(request.body)
    let enquiry=await newEnquiry.save()
    enquiry = enquiry.toObject();
    try {
      response.send(enquiry);
    } catch (error) {
      response.status(500).send(error);
    }
});

//To get all the enquiry information
allRouter.get("/allenquiries", async (request, response) => {
    const enquiryData = await Enquiries.find({}).sort({date:-1});
    try {
      response.send(enquiryData);
    } catch (error) {
      response.status(500).send(error);
    }
});




module.exports=allRouter

// getFields.none() This comes from zod and validates that no extra fields are passed in the request body other than the ones specified. This prevents extra parameters from being passed accidentally.
//request.body.email:all validates email is present and valid format
/*
code for a signup endpoint in an Express server. 
It's handling a POST request to /signup
It's using a middleware function getFields.none() (not sure what this does but probably validation/sanitization)
It's creating a new Users object from the request body
Saving that user object to the database
Converting the saved user object to a regular JavaScript object with toObject()
Sending the converted user object back in the response
The toObject() call is converting the Mongoose document that gets returned from save() into a regular object that can be JSON stringified and sent back to the client. Mongoose documents have extra properties and methods on them for things like validation that don't need to be sent back to the client.

So in summary, the toObject() call is converting the Mongoose document into a plain JavaScript object to remove the extra Mongoose properties and make it serializable to JSON for the response.*/ 