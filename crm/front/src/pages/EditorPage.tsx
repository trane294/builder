import { useEffect, useReducer, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import {
    Puck,
    Config,
    usePuck,
    PuckAction,
    AppState,
    DefaultComponentProps,
    Data,
} from '@measured/puck';
import '@measured/puck/puck.css';
import {
    useGetWebsiteByIdQuery,
    useUpdateWebsiteMutation,
} from 'src/services/website/websiteService';
import { message, Layout } from 'antd';
import { IWebsite } from 'src/types';
import { templatesLibrary } from 'src/templates/template';
import { useAppSelector } from 'src/hooks';
import { useDispatch } from 'react-redux';
// import { openModal } from 'src/features/modal/modalSlice';
import { useSubPath } from 'src/hooks/useSubPath';
import cloneDeep from 'lodash.clonedeep';
// import EditorHeader from 'src/components/editor/EditorHeader';
// import PagesDropdownComponent from 'src/components/editor/PagesPopup';
// import AddPageModal from 'src/modals/AddPageModal';
// import { isEqual } from 'src/utils';
// import { useWebsiteSettingsModal } from 'src/modals/WebsiteSettingsModal';
// import Editor from 'src/components/editor/Editor';

const { Header, Content } = Layout;

type EditorPageProps = {};

export default function EditorPage(props: EditorPageProps) {
    const emtpyPage = JSON.parse(
        '{"root":{"props":{}},"content":[],"zones":{}}'
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id: websiteId } = useParams();
    const { userInfo } = useAppSelector((state) => state.auth);
    const currentPagePath = useSubPath({ basePath: '/editor' });
    const [puckData, setPuckData] = useState<any>(emtpyPage);
    const [website, setWebsite] = useState<IWebsite | null>(null);
    const [isAddPageModalOpen, setIsAddPageModalOpen] = useState(false);
    const puckAppStateRef = useRef<AppState | null>(null);
    const puckDispatchRef = useRef<((action: PuckAction) => void) | null>(null);
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    // const openWebsiteSettingsModal = useWebsiteSettingsModal();

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

    // Main init method
    useEffect(() => {
        if (!website && _website) {
            setWebsite(_website);

            let newData = {};
            if (_website.data[currentPagePath]) {
                console.log('current data:', _website.data[currentPagePath]);
                newData = _website.data[currentPagePath];
            }

            console.log('setPuckData', newData);
            setPuckData(newData);
        }
    }, [_website]);

    useEffect(() => {
        if (!website) return;
        if (!userInfo) return;
        // If config already loaded we should ignore it
        if (config) return;

        const templateConfig = templatesLibrary[website.template.config];
        const _config = templateConfig(userInfo?.firstName);
        setConfig(_config);
    }, [website, websiteId, userInfo]);

    useEffect(() => {
        if (!website) return;
        if (!website.data) return;

        const locationParts = location.pathname.split('/');
        let locationPathPart = locationParts[3];
        if (!locationPathPart) locationPathPart = '/';
        if (locationPathPart !== currentPagePath) return;

        console.log(
            'useEffect: location',
            website.data,
            location,
            currentPagePath
        );
        let newData = emtpyPage;
        if (website.data[currentPagePath]) {
            console.log('current data:', website.data[currentPagePath]);
            newData = website.data[currentPagePath];
        }

        console.log('setPuckData', newData);
        setPuckData(newData);
        // Dispatch setData to Puck using the ref
        if (puckDispatchRef.current) {
            console.log('puckDispatchRef setData', newData);
            puckDispatchRef.current({
                type: 'setData',
                data: newData,
            });
            forceUpdate();
        }
    }, [location, currentPagePath]);

    const saveWebsiteState = (): Promise<IWebsite> => {
        return new Promise((resolve, reject) => {
            if (!website) {
                return reject(new Error('Website is not defined'));
            }
            if (!puckAppStateRef.current) {
                return reject(new Error('Puck app state is not available'));
            }

            const data = puckAppStateRef.current.data;
            console.log('saveWebsiteState data:', data);

            setPuckData(data);
            // Put new page changes into `website` state
            let _website = cloneDeep(website);
            if (!_website.data) _website.data = {};
            _website.data[currentPagePath] = data;
            setWebsite(_website);

            return resolve(_website);
        });
    };

    const handleSave = async () => {
        try {
            const website = await saveWebsiteState();
            console.log('saveWebsite data:', website);
            await updateWebsite(website);
            message.success('Website updated successfully!');
        } catch (err: any) {
            message.error(
                `Failed to update website: ${err.data?.message || err.message}`
            );
            console.error('Error updating website:', err);
        }
    };

    const handleSettings = () => {
        // openWebsiteSettingsModal();
    };

    const handlePageSelect = async (page: string) => {
        const website = await saveWebsiteState();

        let url = `/editor/${website.id}/${page}`;
        if (page === '/' || page === 'Home') url = `/editor/${website.id}`;

        return navigate(url);
    };

    const handleAddPage = () => {
        setIsAddPageModalOpen(true);
    };

    const handleAddNewPage = async (path: string) => {
        const website = await saveWebsiteState();
        const emptyPage = JSON.parse(
            '{"root":{"props":{}},"content":[],"zones":{}}'
        );

        try {
            let _website = cloneDeep(website);

            if (!_website.data) {
                _website.data = {};
            }

            if (!_website.metadata) {
                _website.metadata = {
                    pages: {},
                };
            }

            _website.data[path] = emptyPage;
            _website.metadata.pages[path] = {
                title: '',
                description: '',
                ogImage: '',
            };

            console.log('handleAddNewPage data:', _website);
            setPuckData(emptyPage);
            setWebsite(_website);
            await updateWebsite(_website);
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
        const website = await saveWebsiteState();

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

    const handlePagePreview = () => {
        if (!website) return;

        const url = `/preview/${website.id}/${
            currentPagePath === '/' ? '' : currentPagePath
        }`;
        window.open(url, '_blank');
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
            Editors Page
        </>
    );
}