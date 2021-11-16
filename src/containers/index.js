import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Row, Col } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import SimpleForm from './simpleForm';
import TabForm from './tabForm';
import PickUsers from './pickUsers';
import '../UILibrary/styles/scss/layout.scss';

const { SubMenu } = Menu;

const steps = [
    {
        key: '1',
        component: <SimpleForm />
    },
    {
        key: '2',
        component: <TabForm />
    },
    {
        key: '3',
        component: <PickUsers />
    }
];

const Container = () => {
    const [current, setCurrent] = React.useState('1');

    const handleClick = ({ key }) => {
        setCurrent(key);
    };

    const renderComponent = () => {
        const generateContent = steps.find(m => m.key == current);
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
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                            >
                                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
                                    <Menu.Item key="1">Simple Form</Menu.Item>
                                    <Menu.Item key="2">Tabs Form</Menu.Item>
                                    <Menu.Item key="3">User Selector</Menu.Item>
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
