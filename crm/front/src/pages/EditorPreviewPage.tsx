import { Config, Render } from '@measured/puck';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from 'src/hooks';
import { useGetWebsiteByIdQuery } from 'src/services/website/websiteService';
import { templatesLibrary } from 'src/templates/template';
import { useSubPath } from 'src/hooks/useSubPath';

export default function EditorPreviewPage() {
    const { id: websiteId } = useParams();
    const [config, setConfig] = useState<Config<any, any> | null>(null);
    const { userInfo } = useAppSelector((state) => state.auth);
    const currentPagePath = useSubPath({ basePath: '/preview' });
    const [currentData, setCurrentData] = useState<any>({});

    const [metadata, setMetadata] = useState({
        title: '',
        description: '',
        ogImage: '',
    });

    if (!websiteId) {
        return <Navigate to="/" replace />;
    }

    const {
        data: website,
        isLoading: isLoadingWebsite,
        isError: isErrorWebsite,
        error: errorWebsite,
    } = useGetWebsiteByIdQuery(websiteId);

    useEffect(() => {
        if (!website) return;
        if (!userInfo) return;

        const templateConfig = templatesLibrary[website.template.config];
        const config = templateConfig(userInfo?.firstName);
        setConfig(config);
    }, [website, websiteId, userInfo]);

    useEffect(() => {
        if (!website) return;
        if (!website.data) return;

        console.log(website.data[currentPagePath]);

        if (website.data[currentPagePath]) {
            setCurrentData(website.data[currentPagePath]);
        } else {
            setCurrentData({});
        }

        if (
            website.metadata &&
            website.metadata.pages &&
            website.metadata.pages[currentPagePath]
        ) {
            setMetadata({
                title:
                    website.metadata.pages[currentPagePath].title ||
                    website.name ||
                    '',
                description:
                    website.metadata.pages[currentPagePath].description || '',
                ogImage: website.metadata.pages[currentPagePath].ogImage || '',
            });
        } else {
            setMetadata({
                title: website.name || '',
                description: '',
                ogImage: '',
            });
        }
    }, [website, currentPagePath]);

    if (!website || isLoadingWebsite) {
        return <div>Loading website config...</div>;
    }

    if (!config) {
        return <div>No config found.</div>;
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    {/* Basic Metadata */}
                    <title>{metadata.title}</title>
                    <meta name="description" content={metadata.description} />

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={window.location.href} />
                    <meta property="og:title" content={metadata.title} />
                    <meta
                        property="og:description"
                        content={metadata.description}
                    />
                    {metadata.ogImage && (
                        <meta property="og:image" content={metadata.ogImage} />
                    )}

                    {/* Twitter */}
                    <meta
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        property="twitter:url"
                        content={window.location.href}
                    />
                    <meta property="twitter:title" content={metadata.title} />
                    <meta
                        property="twitter:description"
                        content={metadata.description}
                    />
                    {metadata.ogImage && (
                        <meta
                            property="twitter:image"
                            content={metadata.ogImage}
                        />
                    )}
                </Helmet>
                <Render config={config} data={currentData} />
            </HelmetProvider>
        </>
    );
}
