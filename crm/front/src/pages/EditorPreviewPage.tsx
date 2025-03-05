import { Config, Render } from '@measured/puck';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useGetWebsiteByIdQuery } from 'src/services/website/websiteService';
import { templatesLibrary } from 'src/templates/template';

export default function EditorPreviewPage() {
    const { id: websiteId } = useParams();
    const [config, setConfig] = useState<Config<any, any> | null>(null);

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

        const templateConfig = templatesLibrary[website.template.config];
        setConfig(templateConfig);
    }, [website, websiteId]);

    if (!website || isLoadingWebsite) {
        return <div>Loading website config...</div>;
    }

    if (!config) {
        return <div>No config found.</div>;
    }

    return (
        <>
            <Render config={config} data={website.data || {}} />
        </>
    );
}
