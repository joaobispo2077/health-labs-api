import * as yup from 'yup';

export const UpdateLaboratoryValidator = yup
  .object({
    name: yup.string().strict().optional(),
    address: yup.string().strict().optional(),
    status: yup.string().oneOf(['ativo', 'inativo']).optional(),
  })
  .strict()
  .required();
