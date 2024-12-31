'use client';

import React, { useState } from 'react';
import { Flex, Layout as AntLayout } from 'antd';
import SideNav from '@/app/ui/dashboard/sidenav';
import { signOut } from '@/app/lib/modules/auth/actions';

const { Header, Footer, Sider, Content } = AntLayout;

export const experimental_ppr = true;

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const [collapsed, setCollapsed] = useState(false);
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

    return (
        <Flex
            gap="middle"
            wrap
        >
            <AntLayout hasSider>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    theme="light"
                    style={siderStyle}
                >
                    <SideNav />
                </Sider>
                <AntLayout style={{ marginInlineStart: collapsed ? 80 : 200 }}>
                    <Header>
                        <Flex justify="space-between" align="center">
                            <div>

                            </div>
                            <button onClick={() => {
                                signOut();
                            }}>
                                Logout
                            </button>
                        </Flex>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {children}

                        <div
                            style={{
                                padding: 24,
                                textAlign: 'center',
                            }}
                        >
                            <p>long content</p>
                            {
                                // indicates very long content
                                Array.from({ length: 100 }, (_, index) => (
                                    <React.Fragment key={index}>
                                        {index % 20 === 0 && index ? 'more' : '...'}
                                        <br />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </Content>
                    <Footer>
                        Footer
                    </Footer>
                </AntLayout>
            </AntLayout>
        </Flex>
    );
}