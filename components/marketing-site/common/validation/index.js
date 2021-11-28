import * as Yup from 'yup';
import {PHONE_NUMBER_REGEX} from "@/constants/regex";

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
  product_id: Yup.object().shape({
    _id: Yup.string().required('Product is mandatory'),
  }),
});
