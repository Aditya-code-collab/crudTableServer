const mongoose = require("mongoose");

const TableSchema = mongoose.Schema({
  id: {
    type: String,
    required: false,
  
  },
  name: {
    type: String,
    required: true,
   
  },
  phone: {
    type: Number,
   
  },
  email: {
    type: String,
    required: true,
   unique:true,
   
  },
  
  hobbies: {
    type: [Object],
  }
});

var Table = mongoose.model("Table", TableSchema);

module.exports = Table;
