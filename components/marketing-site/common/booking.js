import React from 'react';
import { BookingForm } from './components';
import {validateCreateBookingForm} from "./validation";
import {Message} from "@/components/alert/message";
import {Formik} from "formik";
import {useMutation, useQuery} from "react-query";
import {CREATE_BOOKING} from "@/adminSite/booking/queries";
import _omit from "lodash.omit";
import {GET_ALL_PRODUCTS} from "@/adminSite/products/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter} from 'next/router';
import _get from 'lodash.get';

const Booking = () => {
  const router = useRouter();
  const { productId = "" } = router.query;
  const {
    mutate: createBooking,
    isLoading: isLoadingSave,
  } = useMutation(CREATE_BOOKING);
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useQuery(
    ['ALL_PRODUCTS', {}],
    GET_ALL_PRODUCTS, {
      ...reactQueryConfig,
    });
  const findProduct = _get(productsData, 'data', []).find(product => product._id === productId);

  return (
    <div className="contact w3l-2">
      <div className="container" id="booking-form">
        <h2 className="w3ls_head">Book <span>Now</span></h2>
        <div className="contact-grids">
          <div className="col-md-12 contact-grid agileinfo-5">
            <p>Lorem Ipsum is inting and typesetting in simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the is dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type specimen book.</p>
            <Formik
              enableReinitialize={true}
              initialValues={{
                full_name: "",
                email: "",
                phone_number: "",
                state: "",
                stateObj: {},
                city: "",
                cityObj: {},
                address: "",
                product_id: findProduct || {},
              }}
              validationSchema={validateCreateBookingForm}
              onSubmit={async (values, actions) => {
                values.product_id = values.product_id._id;
                await createBooking(
                  _omit(values, 'stateObj', 'cityObj'), {
                    onSuccess: () => {
                      const otherOption = {
                        message: "Your Booking is submitted." +
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
                  <BookingForm
                    {...formikProps}
                    isLoadingSave={isLoadingSave}
                    productsData={productsData}
                    isLoading={isLoading}
                    isFetching={isFetching}
                  />
                );}}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export {Booking};