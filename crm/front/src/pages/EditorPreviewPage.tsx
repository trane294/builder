import { Config, Render } from '@measured/puck';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useAppSelector } from 'src/hooks';
import { useGetWebsiteByIdQuery } from 'src/services/website/websiteService';
import { templatesLibrary } from 'src/templates/template';

export default function EditorPreviewPage() {
    const { id: websiteId } = useParams();
    const [config, setConfig] = useState<Config<any, any> | null>(null);
    const { userInfo } = useAppSelector((state) => state.auth);

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
        console.log(config);

        setConfig(templateConfig(userInfo?.firstName));
    }, [website, websiteId, userInfo]);

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
