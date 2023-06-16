import * as yup from 'yup';

export const suggestedEditValidationSchema = yup.object().shape({
  suggested_content: yup.string().required(),
  resource_id: yup.string().nullable().required(),
  guest_contributor_id: yup.string().nullable().required(),
});
