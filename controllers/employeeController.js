const Employee = require('../models/employee');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      status: 'success',
      results: employees.length,
      data: employees,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    res.status(200).json({
      status: 'success',
      data: {
        employee,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        employee: newEmployee,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.eid,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        employee: updatedEmployee,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.deletedEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.eid);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};
