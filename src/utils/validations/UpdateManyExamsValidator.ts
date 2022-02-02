import * as yup from 'yup';

import { UpdateExamValidator } from './UpdateExamValidator';

export const UpdateManyExamsValidator = yup
  .object()
  .shape({
    idList: yup.array().of(yup.string()).required(),
    data: UpdateExamValidator,
  })
  .required();
