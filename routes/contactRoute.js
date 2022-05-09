const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const contactRouter = express.Router();
const nodemailer = require("nodemailer");

contactRouter.post(
  "/postcontactmail",
  expressAsyncHandler(async (req, res) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_KEY,
      },
    });

    var mailOptions = {
      from: "technotaskbuinesssolutions@gmail.com",
      to: ["hr@technotask.co.in, Info@technotask.co.in"],
      // to: ["abhishekjadhav2310@gmail.com"],
      subject: req.body.subject,
      html: `<div style="font-size: 14px margin">
      <div style="padding : 4px 0px 0px 0px">Name: ${req.body.name}</div>
      <div style="padding : 4px 0px 0px 0px">Email: ${req.body.email}</div>
      <div style="padding : 4px 0px 0px 0px">Reason For Contact: ${req.body.reason}</div>
      <div style="padding : 4px 0px 0px 0px">Message: ${req.body.mailBody}</div>
      </div>`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log(data);
        res.json("Request Sent Successfully");
      }
    });
  })
);

module.exports = contactRouter;
