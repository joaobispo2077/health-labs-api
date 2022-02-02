import * as yup from 'yup';

import { CreateExamValidator } from './CreateExamValidator';

export const CreateManyExamsValidator = yup
  .array()
  .of(CreateExamValidator)
  .max(1000)
  .min(1)
  .required('Array of exams must be provided')
  .nullable();
