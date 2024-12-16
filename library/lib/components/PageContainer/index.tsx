import '../../assets/landing.css';

export interface PageContainerProps {
    children: React.ReactNode;
};

export const PageContainer = ({
    children
 }: PageContainerProps) => {
    return (
        <div id="page-container" className="mx-auto flex min-h-screen w-full flex-col bg-gray-100">
            <main id="page-content" className="flex max-w-full flex-auto flex-col">
                { children }
            </main>
        </div>
    );
};

export default PageContainer;