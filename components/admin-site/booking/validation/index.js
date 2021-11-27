import * as Yup from 'yup';
import { PHONE_NUMBER_REGEX } from '@/constants/regex';

export const validateCreateBookingForm = Yup.object().shape({
  full_name: Yup.string().required('Full name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  address: Yup.string().required('Address is mandatory'),
  state: Yup.string().required('State is mandatory'),
  city: Yup.string().required('City is mandatory'),
  phone_number: Yup.string()
    .matches(PHONE_NUMBER_REGEX, 'Only numeric values are allowed.')
    .optional(),
  event_date: Yup.string().required('Event Date is mandatory'),
  pricing_plan: Yup.string().required('Pricing Plan is mandatory'),
  created_by: Yup.string().required('Created by is mandatory'),
});

export const validateUpdateBookingForm = Yup.object().shape({
  full_name: Yup.string().required('Full name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  address: Yup.string().required('Address is mandatory'),
  state: Yup.string().required('State is mandatory'),
  city: Yup.string().required('City is mandatory'),
  phone_number: Yup.string()
    .matches(PHONE_NUMBER_REGEX, 'Only numeric values are allowed.')
    .optional(),
  event_date: Yup.string().required('Event Date is mandatory'),
  pricing_plan: Yup.string().required('Pricing Plan is mandatory'),
  updated_by: Yup.string().required('Updated by is mandatory'),
});