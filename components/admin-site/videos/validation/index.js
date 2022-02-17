import * as Yup from 'yup';

export const validateCreateVideoForm = Yup.object().shape({
  title: Yup.string().required('Image name is mandatory'),
  description: Yup.string().optional(),
  folder_id: Yup.string().required(),
  image_id: Yup.object().shape({
    _id: Yup.string().optional(),
    file_url: Yup.string().optional(),
  }),
  videos_data: Yup.array()
    .min(1, 'At-least one video is mandatory')
    .required('At-least one video is mandatory'),
  created_by: Yup.string().required('Created by is mandatory'),
});

export const validateUpdateVideoForm = Yup.object().shape({
  title: Yup.string().required('Image name is mandatory'),
  description: Yup.string().optional(),
  video_id: Yup.object().shape({
    _id: Yup.string().required('Video is mandatory'),
    file_url: Yup.string().required('Video is mandatory'),
  }),
  folder_id: Yup.string().required(),
  image_id: Yup.object().shape({
    _id: Yup.string().optional(),
    file_url: Yup.string().optional(),
  }),
  updated_by: Yup.string().required('Updated by is mandatory'),
});

export const validateUpdateOrder = Yup.object().shape({
  desired_location: Yup.object().shape({
    value: Yup.string().required('Desired Location is mandatory'),
  }),
});