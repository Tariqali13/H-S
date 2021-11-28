import * as Yup from 'yup';

export const validateCreateProductForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  description: Yup.string().required('Description is mandatory'),
  image_id: Yup.object().shape({
    _id: Yup.string().required('Image is mandatory'),
    file_url: Yup.string().required('Image is mandatory'),
  }),
  created_by: Yup.string().required('Created by is mandatory'),
});

export const validateUpdateProductForm = Yup.object().shape({
  title: Yup.string().required('Title is mandatory'),
  description: Yup.string().required('Description is mandatory'),
  image_id: Yup.object().shape({
    _id: Yup.string().required('Image is mandatory'),
    file_url: Yup.string().required('Image is mandatory'),
  }),
  updated_by: Yup.string().required('Created by is mandatory'),
});