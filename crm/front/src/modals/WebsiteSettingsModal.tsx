import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import {
    Modal as AntModal,
    Button,
    Form,
    FormProps,
    Input,
    message,
} from 'antd';
import { useAppSelector } from 'src/hooks';
import {
    useDeleteWebsiteMutation,
    useGetWebsitesQuery,
    useUpdateWebsiteMutation,
} from 'src/services/website/websiteService';
import { useNavigate, useParams } from 'react-router';
import { IWebsite } from 'src/types';
import DeleteConfirmation from 'src/components/helpers/DeleteConfirmation';
import WebsiteMetadata from 'src/components/editor/WebsiteMetadata';
import { useSubPath } from 'src/hooks/useSubPath';
import cloneDeep from 'lodash.clonedeep';

type FieldType = {
    name?: string;
};

const WebsiteSettingsModal: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, props } = useSelector((state: RootState) => state.modal);
    const { userInfo } = useAppSelector((state) => state.auth);
    const currentPagePath = useSubPath({ basePath: '/editor' });

    if (!userInfo) return null;

    const [localMetadata, setLocalMetadata] = useState<{
        title: string;
        description: string;
        ogImage: string;
    }>({
        title: '',
        description: '',
        ogImage: '',
    });
    const [updateWebsite, { isLoading, isError, error }] =
        useUpdateWebsiteMutation();
    const [deleteWebsite, { isLoading: isLoadingD }] =
        useDeleteWebsiteMutation();
    const { refetch: refetchWebsites } = useGetWebsitesQuery();

    useEffect(() => {
        if (!props.website) return;
        if (!props.website.metadata) return;
        if (!props.website.metadata.pages) return;
        if (props.website.metadata.pages[currentPagePath]) {
            setLocalMetadata(props.website.metadata.pages[currentPagePath]);
        } else {
            setLocalMetadata({
                title: '',
                description: '',
                ogImage: '',
            });
        }
    }, [props, currentPagePath]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            let _website = cloneDeep(props.website);
            _website = { ..._website, ...values };
            if (!_website.metadata) _website.metadata = {};
            if (!_website.metadata.pages) _website.metadata.pages = {};
            _website.metadata.pages[currentPagePath] = localMetadata;

            await updateWebsite(_website as IWebsite);
            message.success('Website updated successfully!');
        } catch (err: any) {
            message.error(
                `Failed to update website: ${err.data?.message || err.message}`
            );
            console.error('Error updating website:', err);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
        errorInfo
    ) => {
        console.log('Failed:', errorInfo);
    };

    const onDeleteWebsite = async () => {
        try {
            await deleteWebsite(props.website.id);
            refetchWebsites();
            dispatch(closeModal());
            navigate('/');
            message.success('Website deleted successfully!');
        } catch (err: any) {
            message.error(
                `Failed to delete website: ${err.data?.message || err.message}`
            );
            console.error('Error delete website:', err);
        }
    };

    return (
        <AntModal
            title="Website Settings"
            open={isOpen}
            onCancel={() => dispatch(closeModal())}
            footer={[
                <Button key="back" onClick={() => dispatch(closeModal())}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    form="myForm"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Save
                </Button>,
            ]}
        >
            <Form
                id="myForm"
                name="basic"
                layout="vertical"
                initialValues={{
                    name: props.website?.name,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Website Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please type project name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>

            <WebsiteMetadata metadata={localMetadata} onChange={setLocalMetadata} />

            <DeleteConfirmation
                key="delete-confirmation"
                onDelete={() => onDeleteWebsite()}
                itemName="website"
            >
                <Button loading={isLoadingD} danger>
                    Delete
                </Button>
            </DeleteConfirmation>
        </AntModal>
    );
};

export default WebsiteSettingsModal;
