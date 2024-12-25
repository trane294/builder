import './styles.css';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // <html lang="en">
        //     <body>
        <div>
            123
            {children}
        </div>
        //     </body>
        // </html>
    );
};
