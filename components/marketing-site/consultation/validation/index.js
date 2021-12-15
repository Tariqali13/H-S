import * as Yup from 'yup';
import {PHONE_NUMBER_REGEX} from "@/constants/regex";

export const validateCreateConsultationForm = Yup.object().shape({
  first_name: Yup.string().required('First name is mandatory'),
  last_name: Yup.string().required('Last name is mandatory'),
  email: Yup.string()
    .email('Please enter valid email address').required('Email is mandatory'),
  address: Yup.string().required('Address is mandatory'),
  state: Yup.string().required('State is mandatory'),
  city: Yup.string().required('City is mandatory'),
  phone_number: Yup.string()
    .matches(PHONE_NUMBER_REGEX, 'Only numeric values are allowed.')
    .optional(),
  booking_type: Yup.object().shape({
    id: Yup.string().required('Booking Type is mandatory'),
  }),
});
