const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Table = require("../schema/tableSchema/tableBasicSchema");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const GetAllTableData = async (req, res) => {
    // console.log(req.userId);
     
   
     try {
       
       const findResult = await Table.find();
       res.status(200).send(findResult);
       
       
     } catch (error) {
       res.status(409).json({ message: error.message });
     }
   };


   

   const DeleteATableData = async (req, res) => {
       console.log("we delete");
    console.log(req.body);
    var _id=req.body.data;

    try {
      
      const findResult = await Table.deleteOne({_id});
      res.status(200).send(findResult);
      
      
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };


  
const InsertATableData = async (req, res) => {
    console.log(req.body);
    const {name, phone, email, hobbies } = req.body;
    const id=email;
    const newTable = new Table({
     id,
     name,
     phone,
     email,
     hobbies
    });

  
    try {
      await newTable.save();
      const data = "New data Added Successfully" ;
      res.status(200).send(data);
    
    } catch (error) {
      res.status(409).json({ data: error.message });
    }
  };



   
const updateTableApi = async (req, res) => {
    console.log(req.body);
    console.log("update");
    const {id,name, phone, email, hobbies } = req.body;
  

  
    try {
      await Table.findByIdAndUpdate({_id:id},{name:name,phone:phone,email:email,hobbies:hobbies});
      const data = "data updated Successfully" ;
      res.status(200).send(data);
    
    } catch (error) {
      res.status(409).json({ data: error.message });
    }
  };


  

  
const mailTableApi = async (req, res) => {
    console.log(req.body);
    console.log(req.body[0]);
    res.send("email data");
 const data=req.body;

 console.log(data);
var emailbody = "  ";
 data.forEach(element => {
     emailbody=emailbody + " 👉👉👨 Name : " +element.name + "✉️---> "+" Email : " + element.email +"📞--->"+ " Phone :" + element.phone +"   ";  
 });
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //host: "smtp.ethereal.email",
    //port: 587,
    service:'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: "cse19106@gmail.com", // generated ethereal user
      pass:process.env.PASS, // generated ethereal password
    },
  });

let mailOptions={
    from: 'cse19106@gmail.com', // sender address
    to: '19106@iiitu.ac.in', // list of receivers
    subject: "Test email containing data from crud table  ", // Subject line
    text: "Hello world?", // plain text body
    html:emailbody, // html body
};

let message = {
    from: 'cse19106@gmail.com>',
    to: '19106@iiitu.ac.in',
    subject: 'Crud table selected data ',
    text: 'the data of selected users is as follows: ',
    html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`
}


  // send mail with defined transport object
  await transporter.sendMail(mailOptions,function(err,data){
      if(err){
          console.log("error occured : " + err);
      }
      else{
          console.log("email sent successfully!!!");
      }
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...




    
  };

module.exports = {
    GetAllTableData,InsertATableData,DeleteATableData,updateTableApi,mailTableApi,
};
