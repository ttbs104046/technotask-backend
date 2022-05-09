const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const careerRouter = express.Router();
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer();
// const fs = require("fs");
// const { promisify } = require("util");
// const { equal } = require("assert");
// const pipeline = promisify(require("stream").pipeline);

careerRouter.post(
  "/postcareermail",
  upload.single("file"),
  expressAsyncHandler(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body.name, req.body.email);

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
      subject: "Carriers at TechnoTask Business Solutions",
      html: `<div style="font-size: 14px margin">
      <div style="padding : 4px 0px 0px 0px"><h1>${req.body.name}</h1></div>
      <div style="padding : 4px 0px 0px 0px"><h2>${req.body.email}</h2></div>
      </div>`,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ],
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

module.exports = careerRouter;
