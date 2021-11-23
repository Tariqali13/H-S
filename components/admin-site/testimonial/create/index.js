import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { TestimonialForm } from '../components';
import { Formik } from 'formik';
import { validateCreateTestimonialForm } from '../validation';
import { CREATE_TESTIMONIAL } from '../queries';
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";

const CreateTestimonial = () => {
  const {
    mutate: createTestimonial,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_TESTIMONIAL);
  const { user_id } = getLocalStorageValues();
  return (
    <SecureTemplate title="Create Testimonial">
      <FormHeader heading="Create Testimonial" />
      <Formik
        initialValues={{
          title: "",
          content: "",
          testimonial_by_name: "",
          testimonial_by_image_id: {},
          created_by: user_id,
        }}
        validationSchema={validateCreateTestimonialForm}
        onSubmit={async (values, actions) => {
          values.testimonial_by_image_id = values.testimonial_by_image_id._id;
          await createTestimonial(values, {
            onSuccess: res => {
              Message.success(res);
              Router.push(
                "/admin/testimonials",
                "/admin/testimonials",
                { shallow: true },
              );
            },
            onError: err => {
              Message.error(err);
              actions.resetForm();
            },
          });
        }}
      >
        {formikProps => {
          return (
            <TestimonialForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateTestimonial;