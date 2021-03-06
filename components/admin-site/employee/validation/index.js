import * as Yup from 'yup';
import {PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE, PHONE_NUMBER_REGEX} from "@/constants/regex";

export const validateCreateEmployeeForm = Yup.object().shape({
  first_name: Yup.string().required('First Name is mandatory'),
  last_name: Yup.string().required('Last Name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  address: Yup.string().required('Address is mandatory'),
  state: Yup.string().required('State is mandatory'),
  city: Yup.string().required('City is mandatory'),
  phone_number: Yup.string()
    .matches(PHONE_NUMBER_REGEX, 'Only numeric values are allowed.')
    .optional(),
  password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE)
    .required('Password is Mandatory'),
  confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password does not match'),
  position: Yup.object().shape({
    id: Yup.string().required('Position is mandatory'),
  }),
  image_id: Yup.object().shape({
    _id: Yup.string().optional(),
    file_url: Yup.string().optional(),
  }),
  created_by: Yup.string().required('Created by is mandatory'),
});
export const validateUpdateEmployeeForm = Yup.object().shape({
  first_name: Yup.string().required('First Name is mandatory'),
  last_name: Yup.string().required('Last Name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  address: Yup.string().required('Address is mandatory'),
  state: Yup.string().required('State is mandatory'),
  city: Yup.string().required('City is mandatory'),
  phone_number: Yup.string()
    .matches(PHONE_NUMBER_REGEX, 'Only numeric values are allowed.')
    .optional(),
  new_password: Yup.string()
    .matches(PASSWORD_REGEX, PASSWORD_VALIDATION_MESSAGE)
    .optional(),
  confirm_password: Yup.string()
    .optional('Confirm Password is required')
    .oneOf([Yup.ref('new_password'), null], 'Password does not match'),
  position: Yup.object().shape({
    id: Yup.string().required('Position is mandatory'),
  }),
  image_id: Yup.object().shape({
    _id: Yup.string().optional().nullable(),
    file_url: Yup.string().optional().nullable(),
  }).nullable(),
  updated_by: Yup.string().required('Updated by is mandatory'),
});