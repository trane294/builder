// import Link from 'next/link';
// import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from '@/auth';

import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    href?: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label: href ? <Link href={href}>{label}</Link> : label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '1', '/dashboard', <PieChartOutlined />),
    getItem('Invoices', '2', '/dashboard/invoices', <DesktopOutlined />),
    getItem('Customers', '3', '/dashboard/customers', <DesktopOutlined />),
    getItem('User', 'sub1', undefined, <UserOutlined />, [
        getItem('Tom', '5'),
        getItem('Bill', '6'),
        getItem('Alex', '7'),
    ]),
    getItem('Team', 'sub2', undefined, <TeamOutlined />, [
        getItem('Team 1', '8'),
        getItem('Team 2', '9')
    ]),
    getItem('Files', '10', undefined, <FileOutlined />),
];

export default function SideNav() {
    return (
        // <div className="flex h-full flex-col px-3 py-4 md:px-2">
        //     <Link
        //         className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        //         href="/"
        //     >
        //         <div className="w-32 text-white md:w-40">
        //             <AcmeLogo />
        //         </div>
        //     </Link>
        //     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        //         <NavLinks />
        //         <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        //         <form
        //             // action={async () => {
        //             //     // 'use client';
        //             //     await signOut();
        //             // }}
        //         >
        //             <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        //                 <PowerIcon className="w-6" />
        //                 <div className="hidden md:block">Sign Out</div>
        //             </button>
        //         </form>
        //     </div>
        // </div>
        <>
            <div style={{
                height: '32px',
                margin: '16px',
                background: 'rgba(255, 255, 255, .2)',
                borderRadius: '6px'
            }} />
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </>
    );
}