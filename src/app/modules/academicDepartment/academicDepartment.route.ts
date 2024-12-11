import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get('/:DepartmentId', AcademicDepartmentController.getSingleacademicDepartment);

router.patch(
  '/:DepartmentId',
  validateRequest(
    academicDepartmentValidation.patchAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.patchSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;