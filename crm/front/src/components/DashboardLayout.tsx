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
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router';

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
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // TODO: move to account
    // useEffect(() => {
    //     dispatch(fetchAccount());
    // }, []);

    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
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