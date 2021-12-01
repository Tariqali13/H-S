import React from 'react';
import { ConsultationForm } from './index';
import {validateCreateConsultationForm} from "../validation";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import {useMutation} from "react-query";
import {CREATE_CONSULTATION} from "@/adminSite/consultation/queries";
import _omit from "lodash.omit";

const Consultation = () => {
  const {
    mutate: createConsultation,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_CONSULTATION);
  return (
    <div className="contact w3l-2">
      <div className="container" id="consultation-form">
        <h2 className="w3ls_head">Consultation </h2>
        <div className="contact-grids">
          <div className="col-md-12 contact-grid agileinfo-5">
            <p>Lorem Ipsum is inting and typesetting in simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the is dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type specimen book.</p>
            <Formik
              enableReinitialize={true}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                state: "",
                stateObj: {},
                city: "",
                cityObj: {},
                address: "",
              }}
              validationSchema={validateCreateConsultationForm}
              onSubmit={async (values, actions) => {
                await createConsultation(
                  _omit(values, 'stateObj', 'cityObj'), {
                    onSuccess: () => {
                      const otherOption = {
                        message: "Your Consultation is submitted." +
                              " We will contact you soon.",
                      };
                      Message.successUserSite(null, otherOption);
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
                  <ConsultationForm
                    {...formikProps}
                    isLoadingSave={isLoadingSave}
                  />
                );}}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export {Consultation};