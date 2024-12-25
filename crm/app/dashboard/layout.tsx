'use client';

import React from 'react';
import { Flex, Layout as AntLayout } from 'antd';
import SideNav from '@/app/ui/dashboard/sidenav';

const { Header, Footer, Sider, Content } = AntLayout;

export const experimental_ppr = true;

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <Flex
            gap="middle"
            wrap
        >
            <AntLayout>
                <Sider
                    width="20%"
                    theme="light"
                >
                    <SideNav />
                </Sider>
                <AntLayout>
                    <Header>
                        Header
                    </Header>
                    <Content>
                        {children}
                    </Content>
                    <Footer>
                        Footer
                    </Footer>
                </AntLayout>
            </AntLayout>
        </Flex>
    );
}