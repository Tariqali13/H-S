import React from 'react';
import _get from "lodash.get";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import { validateUpdateAboutForm } from '../validation';
import { AboutForm } from "./index";
import {ProcessingModal} from "@/components/modal";
import { UPDATE_ABOUT_DATA } from '../../queries';
import { useMutation } from "react-query";
import {getLocalStorageValues} from "@/constants/local-storage";

type Props = {
  type: string,
  aboutData: any,
  refetchAboutData: any,
  isLoadingAbout: boolean,
};
const About = (props: Props) => {
  const { type, aboutData, refetchAboutData, isLoadingAbout } = props;
  const { user_id } = getLocalStorageValues();
  const {
    mutate: updateAboutData,
    isLoading: isLoadingSave,
  } = useMutation(UPDATE_ABOUT_DATA);
  const findAboutData = aboutData.find(about => about.type === type);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          heading: _get(findAboutData, 'heading', ''),
          description: _get(findAboutData, 'description', ''),
          image_id: _get(findAboutData, 'image_id', ''),
          type: type,
          updated_by: user_id,
        }}
        validationSchema={validateUpdateAboutForm}
        onSubmit={async (values, actions) => {
          await updateAboutData({
            id: _get(findAboutData, '_id', ''),
            data: {...values, image_id: _get(values, 'image_id._id', '')},
          }, {
            onSuccess: async res => {
              await refetchAboutData();
              Message.success(res);
              actions.resetForm();
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
            <AboutForm
              {...formikProps}
              isLoadingSave={isLoadingAbout || isLoadingSave}
              buttonText="Update"
            />
          );
        }}
      </Formik>
      {(isLoadingAbout || isLoadingSave) && <ProcessingModal />}
    </>
  );
};

export { About };