import './styles.css';

export default function Layout({
// export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
};