import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { Puck, Config, usePuck } from '@measured/puck';
import '@measured/puck/puck.css';
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/website/websiteService';
import { message } from 'antd';
import { IWebsite } from 'src/types';
import { templatesLibrary } from 'src/templates/template';
import { useAppSelector } from 'src/hooks';
import { useDispatch } from 'react-redux';
import { openModal } from 'src/features/modal/modalSlice';
import { useSubPath } from 'src/hooks/useSubPath';
import cloneDeep from 'lodash.clonedeep';
import EditorHeader from 'src/components/editor/EditorHeader';
import PagesDropdownComponent from 'src/components/editor/PagesPopup';
import AddPageModal from 'src/modals/AddPageModal';

type EditorPageProps = {};

export default function EditorPage(props: EditorPageProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id: websiteId } = useParams();
    const { userInfo } = useAppSelector((state) => state.auth);
    const currentPagePath = useSubPath({ basePath: '/editor' });
    const [currentData, setCurrentData] = useState<any>({});
    const [website, setWebsite] = useState<IWebsite | null>(null);
    const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);

    if (!websiteId) {
        return <Navigate to="/" replace />;
    }

    const {
        data: _website,
        isLoading: isLoadingWebsite,
        isError: isErrorWebsite,
        error: errorWebsite,
        refetch: refetchWebsite,
    } = useGetWebsiteByIdQuery(websiteId, {
        refetchOnMountOrArgChange: true,
    });

    const [
        updateWebsite,
        { isLoading: isUpdating, isError, error: errorUpdate },
    ] = useUpdateWebsiteMutation();
    const [config, setConfig] = useState<Config<any, any> | null>(null);

    const save = async (data: object) => {
        if (!website) return;
        // We need to update state data first
        setCurrentData(data);

        try {
            let _website = cloneDeep(website);
            if (!_website.data) _website.data = {};
            _website.data[currentPagePath] = data;

            await updateWebsite(_website as IWebsite);
            await refetchWebsite();
            message.success('Website updated successfully!');
        } catch (err: any) {
            message.error(
                `Failed to update website: ${err.data?.message || err.message}`
            );
            console.error('Error updating website:', err);
        }
    };

    useEffect(() => {
        if (_website) {
            setWebsite(_website);
        }
    }, [_website]);

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

        if (website.data[currentPagePath]) {
            setCurrentData(website.data[currentPagePath]);
        } else {
            setCurrentData({});
        }
    }, [website, currentPagePath, location]);

    const handleSettings = () => {
        dispatch(
            openModal({
                componentName: 'WebsiteSettingsModal',
                props: { website },
            })
        );
    };

    const handlePageSelect = (page: string) => {
        if (!website) return;

        let url = `/editor/${website.id}/${page}`;
        if (page === '/') url = `/editor/${website.id}`;

        return navigate(url);
    };

    const handleAddPage = () => {
        setIsAddPageModalOpen(true);
    };

    const handleAddNewPage = async (path: string) => {
        if (!website) return;

        try {
            let _website = cloneDeep(website);
            _website.data[path] = {
                content: [],
                root: {
                    props: {},
                },
                zones: {},
            };

            if (!_website.metadata) {
                _website.metadata = {
                    pages: {},
                };
            }

            _website.metadata.pages[path] = {
                title: '',
                description: '',
                ogImage: '',
            };

            await updateWebsite(_website as IWebsite);
            await refetchWebsite();
            handlePageSelect(path);
        } catch (err: any) {
            message.error(
                `Failed to create page: ${err.data?.message || err.message}`
            );
            console.error('Error adding page:', err);
        }
    };

    const handleDeletePage = async (path: string) => {
        if (!website) return;

        try {
            let _website = cloneDeep(website);
            if (_website.data[path]) delete _website.data[path];
            if (
                _website.metadata &&
                _website.metadata.pages &&
                _website.metadata.pages[path]
            ) {
                delete _website.metadata.pages[path];
            }

            await updateWebsite(_website as IWebsite);
            await refetchWebsite();
            message.success('Page deleted successfully!');
        } catch (err: any) {
            message.error(
                `Failed to update website: ${err.data?.message || err.message}`
            );
            console.error('Error deleting page:', err);
        }
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

    return (
        <>
            <AddPageModal
                isOpen={isAddPageModalOpen}
                onClose={() => setIsAddPageModalOpen(false)}
                onAddPage={handleAddNewPage}
            />
            <Puck
                config={config}
                data={currentData}
                onPublish={save}
                overrides={{
                    header: ({ actions }) => {
                        const { appState, dispatch, history } = usePuck();

                        useEffect(() => {
                            dispatch({
                                type: 'setData',
                                data: currentData,
                            });
                        }, [currentData, dispatch]);

                        const hideLeftMenu = () => {
                            dispatch({
                                type: 'setUi',
                                ui: {
                                    leftSideBarVisible:
                                        !appState.ui.leftSideBarVisible,
                                },
                            });
                        };

                        const hideRightMenu = () => {
                            dispatch({
                                type: 'setUi',
                                ui: {
                                    rightSideBarVisible:
                                        !appState.ui.rightSideBarVisible,
                                },
                            });
                        };

                        return (
                            <>
                                <EditorHeader
                                    title="My Page"
                                    isLeftSidebarCollapsed={
                                        appState.ui.leftSideBarVisible
                                    }
                                    isRightSidebarCollapsed={
                                        appState.ui.rightSideBarVisible
                                    }
                                    onLeftToggleSidebar={hideLeftMenu}
                                    onRightToggleSidebar={hideRightMenu}
                                    onUndo={() => history.back()}
                                    onRedo={() => history.forward()}
                                    canUndo={history.hasPast}
                                    canRedo={history.hasFuture}
                                    isSaving={isUpdating}
                                    onSave={() => save(appState.data)}
                                    onSettings={() => handleSettings()}
                                    pagesDropdown={
                                        <PagesDropdownComponent
                                            website={website}
                                            currentPath={currentPagePath}
                                            onPageSelect={handlePageSelect}
                                            onAddPage={handleAddPage}
                                            onDeletePage={handleDeletePage}
                                        />
                                    }
                                />
                            </>
                        );
                    },
                }}
            />
        </>
    );
}
