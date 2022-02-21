import * as Yup from 'yup';

export const validateCreateFolderForm = Yup.object().shape({
  title: Yup.string().required('Folder title is mandatory'),
  description: Yup.string().optional(),
  image_id: Yup.object().shape({
    _id: Yup.string().optional('Image is mandatory'),
    file_url: Yup.string().optional('Image is mandatory'),
  }),
  // is_blocked: Yup.boolean().required(),
  // unblock_after: Yup
  //   .object().when("is_blocked", {
  //     is: true,
  //     then: Yup.object().shape({
  //       _id: Yup.string().required('Unblock After is mandatory'),
  //     }),
  //   }),
  created_by: Yup.string().required('Created by is mandatory'),
});

export const validateUpdateFolderForm = Yup.object().shape({
  title: Yup.string().required('Folder title is mandatory'),
  description: Yup.string().optional(),
  image_id: Yup.object().shape({
    _id: Yup.string().optional('Image is mandatory'),
    file_url: Yup.string().optional('Image is mandatory'),
  }),
  // is_blocked: Yup.boolean().required(),
  // unblock_after: Yup
  //   .object().when("is_blocked", {
  //     is: true,
  //     then: Yup.object().shape({
  //       _id: Yup.string().required('Unblock After is mandatory'),
  //     }),
  //   }),
  updated_by: Yup.string().required('Updated by is mandatory'),
});