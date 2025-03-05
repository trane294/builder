import { Config, Render } from '@measured/puck';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useGetWebsiteByIdQuery } from 'src/services/website/websiteService';
import { photo1Config } from 'src/templates/photo-1/config';
import FooterPhoto1 from 'src/templates/photo-1/footer';
import HeroPhoto1 from 'src/templates/photo-1/hero';
import LayoutPhoto1 from 'src/templates/photo-1/layout';
import MenuPhoto1 from 'src/templates/photo-1/menu';
import SectionPhoto1 from 'src/templates/photo-1/section';

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

        setConfig(photo1Config);
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
