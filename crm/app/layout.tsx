'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import './styles.css';

const { Header, Content, Footer } = Layout;
const { Item: BreadcrumbItem } = Breadcrumb;

const items = new Array(3).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <html lang="en">
            <body>
                <AntdRegistry>
                    <Layout>
                        <Header style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="demo-logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['2']}
                                items={items}
                                style={{ flex: 1, minWidth: 0 }}
                            />
                        </Header>
                        <Content style={{ padding: '0 48px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }, { title: 'App' }]} />
                            <div
                                style={{
                                    padding: 24,
                                    minHeight: 380,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                }}
                            >
                                {children}
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            App ©{new Date().getFullYear()}
                        </Footer>
                    </Layout>
                </AntdRegistry>
            </body>
        </html>
    );
}
