import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { student: studentData } = req.body;

    // data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);
    // const {error, value} = studentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

const getAllStudents: RequestHandler = async (req, res, next) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(201).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass to error handler
    res.status(500).json({
      success: true,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const getStudentById: RequestHandler = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentById(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
