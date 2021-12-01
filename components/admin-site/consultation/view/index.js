import React from 'react';
import SecureTemplate from "@/layouts/secure-template";
import { FormHeader } from "@/adminSite/common";
import { ConsultationView } from '../components';
import { useQuery } from "react-query";
import { GET_CONSULTATION_BY_ID } from "@/adminSite/consultation/queries";
import reactQueryConfig from "@/constants/react-query-config";
import { useRouter } from "next/router";
import { Message } from "@/components/alert/message";
import { ProcessingModal } from "@/components/modal";
import _get from 'lodash.get';

const ViewBlog = () => {
  const router = useRouter();
  const { consultationId } = router.query;
  const isEnabled = consultationId !== undefined;
  const {
    data: consultationData,
    isLoading,
  } = useQuery(['GET_CONSULTATION_BY_ID', { consultationId }], GET_CONSULTATION_BY_ID, {
    ...reactQueryConfig,
    enabled: isEnabled,
    onError: err => {
      Message.error(err);
      router.back();
    },
  });
  return (
    <SecureTemplate title="View Consultation">
      <FormHeader heading="View Consultation" />
      <ConsultationView consultationData={_get(consultationData, 'data', {})}/>
      {isLoading && <ProcessingModal />}
    </SecureTemplate>
  );
};

export default ViewBlog;