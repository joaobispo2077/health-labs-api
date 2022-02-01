import * as yup from 'yup';

export const CreateExamValidator = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required().oneOf(['analise clinica', 'imagem']),
});
