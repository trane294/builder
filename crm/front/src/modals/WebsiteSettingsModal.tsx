import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import { Modal as AntModal, Button, Form, FormProps, Input, message } from 'antd';
import { useAppSelector } from 'src/hooks';
import { useGetWebsiteByIdQuery, useUpdateWebsiteMutation } from 'src/services/website/websiteService';
import { Config } from '@measured/puck';
import { useParams } from 'react-router';
import { IWebsite } from 'src/types';

type FieldType = {
    name?: string;
};

const WebsiteSettingsModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, props } = useSelector((state: RootState) => state.modal);
    const { userInfo } = useAppSelector((state) => state.auth);

    if (!userInfo) return null;

    const [updateWebsite, { isLoading, isError, error }] =
        useUpdateWebsiteMutation();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        try {
            let _website = { ...props.website };
            _website = { ..._website, ...values };
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

    return (
        <AntModal
            title="Website Settings"
            open={isOpen}
            onCancel={() => dispatch(closeModal())}
            footer={[
                <Button onClick={() => dispatch(closeModal())}>Cancel</Button>,
                <Button
                    type="primary"
                    form="myForm"
                    key="submit"
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
        </AntModal>
    );
};

export default WebsiteSettingsModal;
