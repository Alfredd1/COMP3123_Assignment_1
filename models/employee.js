const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: 'String',
  last_name: 'String',
  email: 'String',
  position: 'String',
  salary: 'Number',
  date_of_joining: 'Date',
  department: 'String',
  user: 'ObjectId',
  created_at: 'Date',
  updated_at: 'Date',
});

const emp = mongoose.model('Employee', employeeSchema);

module.exports = emp;

/*

"_id": "ObjectId",
  "first_name": "String",
  "last_name": "String",
  "email": "String",
  "position": "String",
  "salary": "Number",
  "date_of_joining": "Date",
  "department": "String",
  "user": "ObjectId" //Refer to User
  "created_at": "Date",
  "updated_at": "Date"
 */
