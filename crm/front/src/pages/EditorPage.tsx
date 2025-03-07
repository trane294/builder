import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { Puck, Config } from '@measured/puck';
import '@measured/puck/puck.css';
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/website/websiteService';
import { message } from 'antd';
import { IWebsite } from 'src/types';
import { templatesLibrary } from 'src/templates/template';
import { useAppSelector } from 'src/hooks';

type EditorPageProps = {};

export default function EditorPage(props: EditorPageProps) {
    const { id: websiteId } = useParams();
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

    const [
        updateWebsite,
        { isLoading: isUpdating, isError, error: errorUpdate },
    ] = useUpdateWebsiteMutation();
    const [config, setConfig] = useState<Config<any, any> | null>(null);

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
        if (!userInfo) return;

        // const templateConfig = templatesLibrary[website.template.config];
        // setConfig(templateConfig);
        const templateConfig = templatesLibrary[website.template.config];
        const config = templateConfig(userInfo?.firstName);
        console.log(config);

        setConfig(templateConfig(userInfo?.firstName));
    }, [website, websiteId, userInfo]);

    if (isErrorWebsite) {
        return (
            <div>
                Error loading website:{' '}
                {errorWebsite && 'Unknown error'}
            </div>
        );
    }

    if (!website || isLoadingWebsite) {
        return <div>Loading website config...</div>;
    }

    if (!config) {
        return <div>No config found.</div>;
    }

    return <Puck config={config} data={website.data || {}} onPublish={save} />;
}
