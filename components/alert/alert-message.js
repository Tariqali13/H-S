import React from 'react';

type Props = {
  heading?: string,
  message: string,
};

const AlertMessage = (props: Props) => {
  const { heading, message } = props;
  return (
    <React.Fragment>
      <h2 className="fzl fwm" style={{ marginTop: "0px" }}>{heading}</h2>
      <p>{message}</p>
    </React.Fragment>
  );
};

export default AlertMessage;
