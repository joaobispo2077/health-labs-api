import * as yup from 'yup';

export const CreateLaboratoryValidator = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  status: yup.string().required().oneOf(['ativo', 'inativo']),
});
