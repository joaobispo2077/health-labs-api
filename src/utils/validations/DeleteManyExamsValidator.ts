import * as yup from 'yup';

export const DeleteManyExamsValidator = yup
  .array()
  .of(yup.string())
  .min(1)
  .max(50)
  .required();
