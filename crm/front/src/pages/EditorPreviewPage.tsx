import { Config, Render } from '@measured/puck';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from 'src/hooks';
import { useGetWebsiteByIdQuery } from 'src/services/website/websiteService';
import { templatesLibrary } from 'src/templates/template';

export default function EditorPreviewPage() {
    const { id: websiteId } = useParams();
    const [config, setConfig] = useState<Config<any, any> | null>(null);
    const { userInfo } = useAppSelector((state) => state.auth);

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

        // Set metadata from website data if available
        if (website.metadata) {
            setMetadata({
                title: website.metadata.title || website.name || '',
                description: website.metadata.description || '',
                ogImage: website.metadata.ogImage || '',
            });
        } else {
            // Fallback to website name if no metadata
            setMetadata({
                title: website.name || '',
                description: '',
                ogImage: '',
            });
        }
    }, [website, websiteId, userInfo]);

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
                <Render config={config} data={website.data || {}} />
            </HelmetProvider>
        </>
    );
}
