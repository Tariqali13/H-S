import * as Yup from 'yup';
import { PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE } from '@/constants/regex';

export const validateLoginForm = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE)
    .required('Password is Mandatory'),
});