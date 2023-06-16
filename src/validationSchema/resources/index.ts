import * as yup from 'yup';

export const resourceValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  thinker_id: yup.string().nullable().required(),
  creator_id: yup.string().nullable().required(),
});
