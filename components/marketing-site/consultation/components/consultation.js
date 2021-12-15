import React from 'react';
import { ConsultationForm } from './index';
import {validateCreateConsultationForm} from "../validation";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import {useMutation} from "react-query";
import {CREATE_CONSULTATION} from "@/adminSite/consultation/queries";
import _omit from "lodash.omit";
import {creditScoreOptions} from "@/constants/booking";

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
            <p className="text-center">No-Cost, No-Obligation Solar Analysis from an Expert.</p>
            <Formik
              enableReinitialize={true}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                bill_range: {},
                credit_score: creditScoreOptions[0],
                state: "",
                stateObj: {},
                city: "",
                cityObj: {},
                address: "",
                booking_type: {},
              }}
              validationSchema={validateCreateConsultationForm}
              onSubmit={async (values, actions) => {
                values.bill_range = values.bill_range.value;
                values.credit_score = values.credit_score.value;
                values.booking_type = values.booking_type.value;
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