import React from 'react';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Col, Dropdown, Layout, Menu, Row, theme } from 'antd';
import { Link, Outlet } from 'react-router';
import AvatarImg from 'src/assets/images/avatar.svg';
import { logout } from 'src/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

const items: MenuProps['items'] = [
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

const DashboardLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dropdownItems: MenuProps['items'] = [
        {
            key: '1',
            label: 'Logout',
            onClick: () => dispatch(logout()),
        },
    ];

    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={items}
                />
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Row
                        align="middle"
                        style={{
                            paddingInline: 24,
                        }}
                    >
                        <Col flex={2}>
                            <Link to="/">Logo Project</Link>
                        </Col>
                        <Col style={{ textAlign: 'right', marginLeft: 25 }}>
                            Welcome John Cena
                        </Col>
                        <Col>
                            <Dropdown
                                menu={{ items: dropdownItems }}
                                placement="bottomRight"
                            >
                                <div
                                    style={{
                                        height: 40,
                                        width: 40,
                                        backgroundColor: '#545B64',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        marginLeft: 14,
                                    }}
                                >
                                    <img src={AvatarImg} alt="Avatar" />
                                </div>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
