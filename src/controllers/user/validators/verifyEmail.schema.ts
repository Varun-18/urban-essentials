import * as yup from 'yup';

export const verifyEmailSchema = yup.object({
  params: yup.object({
    token: yup.string().required('Token for email verifcation is missing'),
  }),
});
