import * as yup from 'yup';

export const UpdateExamValidator = yup
  .object({
    name: yup.string().strict().optional(),
    type: yup.string().oneOf(['analise clinica', 'imagem']).optional(),
    status: yup.string().oneOf(['ativo', 'inativo']).optional(),
  })
  .strict()
  .required();
