import * as Yup from 'yup';

export const validateCreateContactForm = Yup.object().shape({
  full_name: Yup.string().required('Full name is mandatory'),
  subject: Yup.string().required('Subject is mandatory'),
  message: Yup.string().required('Message is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
});
