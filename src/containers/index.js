import React from "react";
import "antd/dist/antd.css";
import { Menu, Row, Col } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import "../UILibrary/styles/scss/layout.scss"; // import scss from UILibrary
import connectApi from "../apis";

// ui lib components
import SimpleForm from "./uiLibComponents/simpleForm";
import TabForm from "./uiLibComponents/tabForm";
import PickUsers from "./uiLibComponents/pickUsers";
import FileUploader from "./uiLibComponents/fileUploader";
import ActiveMandate from "./uiLibComponents/activeMandate";
import InitialProposalForm from "./uiLibComponents/initialProposalForm";
import DownloadByDocumentLink from "./uiLibComponents/downloadLinks";

// validation module samples
import VMFormFunctional from './validationModuleSamples/simpleFormFunctional';
import VMFormJSON from './validationModuleSamples/simpleFormJson';
import VMUserPicker from './validationModuleSamples/userPickerValidation';

const { SubMenu } = Menu;

const steps = [
  {
    key: "1",
    component: <SimpleForm />,
  },
  {
    key: "2",
    component: <TabForm />,
  },
  {
    key: "3",
    component: <PickUsers />,
  },
  {
    key: "4",
    component: <FileUploader api={connectApi} />,
  },
  {
    key: "5",
    component: <ActiveMandate />,
  },
  {
    key: "6",
    component: <InitialProposalForm />,
  },
  {
    key: "7",
    component: <DownloadByDocumentLink api={connectApi} />,
  },
  {
    key: "8",
    component: <VMFormFunctional />,
  },
  {
    key: "9",
    component: <VMFormJSON />,
  },
  {
    key: "10",
    component: <VMUserPicker />,
  }
];

const Container = () => {
  const [current, setCurrent] = React.useState("1");

  const handleClick = ({ key }) => {
    setCurrent(key);
  };

  const renderComponent = () => {
    const generateContent = steps.find((m) => m.key == current);
    return generateContent.component;
  };

  return (
    <>
      <div style={{ height: 60 }}></div>
      <Row gutter={6}>
        <Col xl={4} lg={4} xs={24}></Col>
        <Col xl={16} lg={16} xs={24}>
          <Row gutter={6}>
            <Col xl={8} lg={8} xs={24}>
              <Menu
                onClick={handleClick}
                style={{ width: 256 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  icon={<AppstoreOutlined />}
                  title="UI Library Components"
                >
                  <Menu.Item key="1">Simple Form</Menu.Item>
                  <Menu.Item key="2">Tabs Form</Menu.Item>
                  <Menu.Item key="3">User Selector</Menu.Item>
                  <Menu.Item key="4">File Uploader</Menu.Item>
                  <Menu.Item key="5">Active Mandate</Menu.Item>
                  <Menu.Item key="6">Initial Proposal Form</Menu.Item>
                  <Menu.Item key="7">Document Download</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<AppstoreOutlined />}
                  title="Validation Module"
                >
                  <Menu.Item key="8">Fuctional Field Validations</Menu.Item>
                  <Menu.Item key="9">JSON Field Validations</Menu.Item>
                  <Menu.Item key="10">User Picker Validations</Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
            <Col xl={16} lg={16} xs={24}>
              <div style={{ padding: 30 }}>{renderComponent()}</div>
            </Col>
          </Row>
        </Col>
        <Col xl={4} lg={4} xs={24}></Col>
      </Row>
    </>
  );
};

export default Container;
