import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { ProductForm } from '../components';
import { Formik } from 'formik';
import { useQuery } from "react-query";
import { GET_PRODUCT_BY_ID } from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import _get from 'lodash.get';
import { ProcessingModal } from "@/components/modal";

const ViewProduct = () => {
  const router = useRouter();
  const { productId } = router.query;
  const isEnabled = productId !== undefined;
  const {
    data: ProductData,
    isLoading,
  } = useQuery(['PRODUCT_BY_ID', { productId }],
    GET_PRODUCT_BY_ID, {
      ...reactQueryConfig,
      enabled: isEnabled,
      onError: err => {
        Message.error(err);
        router.back();
      },
    });
  return (
    <SecureTemplate title="View Product">
      <FormHeader heading="View Product" />
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: _get(ProductData, 'data.title', ''),
          description: _get(ProductData, 'data.description', ''),
          image_id: _get(ProductData, 'data.image_id', []),
        }}
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <ProductForm {...formikProps} isView={true} />
          );}}
      </Formik>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewProduct;