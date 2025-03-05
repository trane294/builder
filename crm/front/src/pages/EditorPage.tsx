import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { Puck, Config } from '@measured/puck';
import '@measured/puck/puck.css';
import { photo1Config } from 'src/templates/photo-1/config';
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/website/websiteService';
import { message } from 'antd';
import { ICreateWebsite, IWebsite } from 'src/types';

type EditorPageProps = {};

export default function EditorPage(props: EditorPageProps) {
    const { id: websiteId } = useParams();

    if (!websiteId) {
        return <Navigate to="/" replace />;
    }

    const {
        data: website,
        isLoading: isLoadingWebsite,
        isError: isErrorWebsite,
        error: errorWebsite,
    } = useGetWebsiteByIdQuery(websiteId);

    const [
        updateWebsite,
        { isLoading: isUpdating, isError, error: errorUpdate },
    ] = useUpdateWebsiteMutation();
    const [config, setConfig] = useState<Config<any, any> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [initialData] = useState<Record<string, any>>({});

    const save = async (data: object) => {
        console.log('onPublish data:', data);
        try {
            let _website = { ...website };
            _website.data = data;
            await updateWebsite(_website as IWebsite);
            message.success('Website updated successfully!');
        } catch (err: any) {
            message.error(
                `Failed to update website: ${err.data?.message || err.message}`
            );
            console.error('Error updating website:', err);
        }
    };

    useEffect(() => {
        if (!website) return;

        setConfig(photo1Config);
    }, [website, websiteId]);

    if (isLoadingWebsite) {
        return <div>Loading website data...</div>;
    }

    if (isErrorWebsite) {
        return (
            <div>
                Error loading website:{' '}
                {errorWebsite && 'Unknown error'}
            </div>
        );
    }

    if (!website) {
        return <Navigate to="/" replace />;
    }

    if (isLoadingWebsite) {
        return <div>Loading template config...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!config) {
        return <div>No config found.</div>;
    }

    return <Puck config={config} data={website.data || {}} onPublish={save} />;
}
