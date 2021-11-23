import React, {useState} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from 'reactstrap';
import classnames from 'classnames';

type Props = {
  tabsArray: Array<any>,
  handleTabChange: () => void,
  children: any,
}
const Tabs = (props: Props) => {
  const { tabsArray, handleTabChange, children } = props;
  const [activeTab, setActiveTab] = useState("1");
  const toggle = tab => {
    setActiveTab(tab.id);
    if (handleTabChange) {
      handleTabChange(tab);
    }
  };
  return (
    <>
      <Nav tabs>
        {tabsArray.map((tab, i) => (
          <NavItem key={i}>
            <NavLink
              className={classnames({ active: activeTab === tab.id })}
              onClick={() => toggle(tab)}
            >
              {tab.name}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {children}
      </TabContent>
    </>
  );
};

export default Tabs;