const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee)
  .delete(employeeController.deleteEmployee);

router
  .route('/:eid')
  .get(employeeController.getEmployee)
  .put(employeeController.updateEmployee);

module.exports = router;
