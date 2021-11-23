import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { TestimonialForm } from '../components';
import { Formik } from 'formik';
import { useQuery } from "react-query";
import { GET_TESTIMONIAL_BY_ID } from "@/adminSite/testimonial/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";

const ViewTestimonial = () => {
  const router = useRouter();
  const { testimonialId } = router.query;
  const isEnabled = testimonialId !== undefined;
  const {
    data: testimonialData,
    isLoading,
  } = useQuery(['GET_TESTIMONIAL_BY_ID', { testimonialId }],
    GET_TESTIMONIAL_BY_ID, {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError: err => {
        Message.error(err);
        router.back();
      },
    });
  return (
    <SecureTemplate title="View Testimonial">
      <FormHeader heading="View Testimonial" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(testimonialData, 'data.title', ''),
          content: _get(testimonialData, 'data.content', ''),
          pictures_data: _get(testimonialData, 'data.testimonial_images', []),
        }}
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <TestimonialForm {...formikProps} isView={true} />
          );}}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewTestimonial;