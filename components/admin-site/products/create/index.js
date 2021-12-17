import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { ProductForm } from '../components';
import { Formik } from 'formik';
import { validateCreateProductForm } from '../validation';
import { CREATE_PRODUCT } from '../queries';
import { useMutation } from "react-query";
import {Message} from "@/components/alert/message";
import Router from "next/router";
import { getLocalStorageValues } from "@/constants/local-storage";
import {ProcessingModal} from "@/components/modal";

const CreateProduct = () => {
  const {
    mutate: createProduct,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_PRODUCT);
  const { user_id } = getLocalStorageValues();
  return (
    <SecureTemplate title="Add Service">
      <FormHeader heading="Add Service" />
      <Formik
        initialValues={{
          title: "",
          description: "",
          image_id: {},
          created_by: user_id,
        }}
        validationSchema={validateCreateProductForm}
        onSubmit={async (values, actions) => {
          values.image_id = values.image_id._id;
          await createProduct(values, {
            onSuccess: res => {
              Message.success(res);
              Router.push(
                "/admin/services",
                "/admin/services",
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
            <ProductForm
              {...formikProps}
              isLoadingSave={isLoadingSave}
            />
          );}}
      </Formik>
      {isLoadingSave && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default CreateProduct;