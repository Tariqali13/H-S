import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { TestimonialForm } from '../components';
import { Formik } from 'formik';
import {useMutation, useQuery} from "react-query";
import {UPDATE_TESTIMONIAL, GET_TESTIMONIAL_BY_ID}
  from "@/adminSite/testimonial/queries";
import reactQueryConfig from "@/constants/react-query-config";
import Router, { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";
import {getLocalStorageValues} from "@/constants/local-storage";
import { validateUpdateTestimonialForm} from
  "@/adminSite/testimonial/validation";
import _omit from "lodash.omit";

const EditTestimonial = () => {
  const router = useRouter();
  const { testimonialId } = router.query;
  const {
    mutate: updateTestimonial,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_TESTIMONIAL);
  const { user_id } = getLocalStorageValues();
  const isEnabled = testimonialId !== undefined;
  const {
    data: testimonialData,
    isLoading,
  } = useQuery(['GET_TESTIMONIAL_BY_ID',
    { testimonialId }], GET_TESTIMONIAL_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title="Edit Testimonial">
      <FormHeader heading="Edit Testimonial" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(testimonialData, 'data.title', ''),
          content: _get(testimonialData, 'data.content', ''),
          testimonial_by_name: _get(testimonialData,
            'data.testimonial_by_name', ''),
          testimonial_by_image_id: _get(testimonialData,
            'data.testimonial_by_image_id', {}),
          updated_by: user_id,
        }}
        validationSchema={validateUpdateTestimonialForm}
        onSubmit={async (values, actions) => {
          values.testimonial_by_image_id = values.testimonial_by_image_id._id;
          await updateTestimonial({
            id: testimonialId,
            data: values,
          }, {
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
              buttonText="Update"
            />
          );}}
      </Formik>
      {(isLoading || isLoadingSave) && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default EditTestimonial;