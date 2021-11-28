import React from 'react';
import { ContactForm } from './index';
import {validateCreateContactForm} from "../validation";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import {useMutation} from "react-query";
import {CREATE_CONTACT} from "../queries";

const Contacts = () => {
  const {
    mutate: createContact,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_CONTACT);
  return (
    <div className="contact w3l-2">
      <div className="container">
        <h2 className="w3ls_head">Contact <span>us</span></h2>
        <div className="contact-grids">
          <div className="col-md-7 contact-grid agileinfo-5">
            <h4>Your Message</h4>
            <p>Lorem Ipsum is inting and typesetting in simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the is dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type specimen book.</p>
            <Formik
              initialValues={{
                full_name: "",
                email: "",
                subject: "",
                message: "",
              }}
              validationSchema={validateCreateContactForm}
              onSubmit={async (values, actions) => {
                await createContact(values, {
                  onSuccess: () => {
                    const otherOption = {
                      message: "Your form is submitted." +
                          " We will contact back to you soon.",
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
                  <ContactForm {...formikProps} isLoadingSave={isLoadingSave} />
                );}}
            </Formik>
          </div>
          <div className="col-md-5 contact-grid agileits-5">
            <div className="contact-left">
              <h4> Address</h4>
              <div className="cont-info">
                <h5>Address</h5>
                <p>7th Street, Melbourne City, Australiae</p>
                <h5>Email</h5>
                <a href="mailto:example@mail.com"> example@mail.com</a>
                <h5>Phone</h5>
                <p> +080 264 995</p>
              </div>
            </div>
            <div className="contact-bottom wthree-5">
              <h4>Get connected</h4>
              <p>Lorem Ipsum is inting and typesetting in simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the is dummy text ever since the 1500s, when
                                an unknown printer took a galley of type and scrambled it to make a type specimen
                                book.</p>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
};

export {Contacts};