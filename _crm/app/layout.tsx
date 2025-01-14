import { Metadata } from 'next';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from 'antd';
import theme from '@/theme/themeConfig';

export const metadata: Metadata = {
    title: {
        template: '%s | Acme Dashboard',
        default: 'Acme Dashboard',
    },
    description: 'The official Next.js Learn Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <AntdRegistry>
                    <ConfigProvider
                        theme={theme}
                    >
                        {children}
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}