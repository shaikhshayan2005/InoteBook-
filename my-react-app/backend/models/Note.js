const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({

    //type : mongoose.Schema.Types.ObjectId : this tells MongoDB that user field 
    // will store a unique id that mongoDB automatically generates for each user
    //this ID helps mongoDB quickly find and connect the right user to their notes.
    user:{
        type : mongoose.Schema.Types.ObjectId, // stores a user
        ref : 'user'

    },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: 'General',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

module.exports = mongoose.model('notes', notesSchema);