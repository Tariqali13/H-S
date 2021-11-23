import React from 'react';
import { Dropdown } from 'reactstrap';

type IProps = {
  dropdownToggle: any,
  children: any,
  open: boolean,
}

const DropDown = (props: IProps) => {
  const { dropdownToggle, children, open } = props;
  return (
    <Dropdown show={open}>
      <Dropdown.Toggle caret>
        {dropdownToggle}
      </Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  );
};
export default DropDown;
