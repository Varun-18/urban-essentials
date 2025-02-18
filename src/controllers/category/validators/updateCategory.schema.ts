import * as yup from 'yup';

export const updateCategorySchema = yup.object({
  body: yup.object({
    id: yup.string().required('ID is required field'),
    status: yup
      .string()
      .oneOf(['active', 'inactive'], 'status must be either active | inactive'),
    name: yup.string(),
  }),
});
