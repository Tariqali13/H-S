import * as Yup from 'yup';

export const validateCreateTestimonialForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  content: Yup.string().required('Content is mandatory'),
  testimonial_by_name: Yup.string()
    .required('Testimonial By Name is mandatory'),
  testimonial_by_image_id: Yup.object().shape({
    _id: Yup.string().required('Image is mandatory'),
    file_url: Yup.string().required('Image is mandatory'),
  }),
  created_by: Yup.string().required('Created by is mandatory'),
});

export const validateUpdateTestimonialForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  content: Yup.string().required('Content is mandatory'),
  testimonial_by_name: Yup
    .string().required('Testimonial By Name is mandatory'),
  testimonial_by_image_id: Yup.object().shape({
    _id: Yup.string().required('Image is mandatory'),
    file_url: Yup.string().required('Image is mandatory'),
  }),
  updated_by: Yup.string().required('Created by is mandatory'),
});