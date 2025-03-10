import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { Puck, Config, usePuck } from '@measured/puck';
import '@measured/puck/puck.css';
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/website/websiteService';
import { Button, message } from 'antd';
import { IWebsite } from 'src/types';
import { templatesLibrary } from 'src/templates/template';
import { useAppSelector } from 'src/hooks';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/features/modal/modalSlice';
import { useSubPath } from 'src/hooks/useSubPath';
import cloneDeep from 'lodash.clonedeep';
import EditorHeader from 'src/components/editor/EditorHeader';

type EditorPageProps = {};

export default function EditorPage(props: EditorPageProps) {
    const dispatch = useDispatch();
    const { id: websiteId } = useParams();
    const { userInfo } = useAppSelector((state) => state.auth);
    const currentPagePath = useSubPath({ basePath: '/editor' });
    const [currentData, setCurrentData] = useState<any>({});

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
        if (!website) return;
        console.log('onPublish data:', data);

        try {
            let _website = cloneDeep(website);
            if (!_website.data) _website.data = {};
            _website.data[currentPagePath] = data;

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

        const templateConfig = templatesLibrary[website.template.config];
        const config = templateConfig(userInfo?.firstName);
        setConfig(config);
    }, [website, websiteId, userInfo]);

    useEffect(() => {
        if (!website) return;
        if (!website.data) return;

        // If website data already contains page data - load it
        if (website.data[currentPagePath]) {
            setCurrentData(website.data[currentPagePath]);
        } else {
            // If there is not page data - create new one with empty object
            setCurrentData({});
        }
    }, [website, currentPagePath]);

    const handleSettings = () => {
        dispatch(
            openModal({
                componentName: 'WebsiteSettingsModal',
                props: { website },
            })
        );
    };

    if (isErrorWebsite) {
        return (
            <div>Error loading website: {errorWebsite && 'Unknown error'}</div>
        );
    }

    if (!website || isLoadingWebsite) {
        return <div>Loading website config...</div>;
    }

    if (!config) {
        return <div>No config found.</div>;
    }

    console.log('Current page path', currentPagePath);

    return (
        <Puck
            config={config}
            data={currentData}
            onPublish={save}
            overrides={{
                header: ({ actions }) => {
                    const { appState, dispatch, history } = usePuck();

                    const hideLeftMenu = () => {
                        dispatch({
                            type: 'setUi',
                            ui: {
                                leftSideBarVisible: !appState.ui.leftSideBarVisible,
                            },
                        });
                    };

                    const hideRightMenu = () => {
                        dispatch({
                            type: 'setUi',
                            ui: {
                                rightSideBarVisible: !appState.ui.rightSideBarVisible,
                            },
                        });
                    };

                    return (
                        <>
                            <EditorHeader
                                title="My Page"
                                isLeftSidebarCollapsed={appState.ui.leftSideBarVisible}
                                isRightSidebarCollapsed={appState.ui.rightSideBarVisible}
                                onLeftToggleSidebar={hideLeftMenu}
                                onRightToggleSidebar={hideRightMenu}
                                onUndo={() => history.back()}
                                onRedo={() => history.forward()}
                                canUndo={history.hasPast}
                                canRedo={history.hasFuture}
                                isSaving={isUpdating}
                                onSave={() => save(appState.data)}
                                onSettings={() => handleSettings()}
                            />
                        </>
                    );
                },
            }}
        />
    );
}
