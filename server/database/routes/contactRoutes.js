let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

let contactSchema = require('../models/contact');

// RETRIEVE ALL CONTACTS
router.route('/').get((req, res) => {
    contactSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})
  
// CREATE CONTACT
router.route('/create-contact').post((req, res, next) => {
  contactSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// RETRIEVE SINGLE CONTACT
router.route('/edit-contact/:id').get((req, res) => {
  contactSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// UPDATE CONTACT
router.route('/update-contact/:id').put((req, res, next) => {
  contactSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Contact Successfully Updated!')
    }
  })
})

// DELETE CONTACT
router.route('/delete-contact/:id').delete((req, res, next) => {
  contactSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;
