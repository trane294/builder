import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import { Modal as AntModal, Button, Card, Row, Col } from 'antd';
import {
    useCreateWebsiteMutation,
    useGetWebsitesQuery,
} from 'src/services/website/websiteService';
import { useAppSelector } from 'src/hooks';

const activeCardStyle = {
    boxShadow:
        '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
};

const CreateWebsiteModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, componentName, props } = useSelector(
        (state: RootState) => state.modal
    );
    const { userInfo } = useAppSelector((state) => state.auth);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
        null
    );
    const [createWebsite, { isLoading, isError, error }] =
        useCreateWebsiteMutation();
    const { refetch: refetchWebsites } = useGetWebsitesQuery();

    if (!isOpen || !componentName || !userInfo) return null;

    const templates = ['Template 1', 'Template 2', 'Template 3'];

    const handleTemplateSelect = (template: string) => {
        setSelectedTemplate(template);
    };

    const handleCreateWebsite = async () => {
        if (selectedTemplate) {
            try {
                const formattedDateTime = DateTime.now().toFormat('dd.MM.yyyy HH:mm');
                await createWebsite({
                    name: 'Website ' + formattedDateTime,
                    templateId: 1,
                    userId: userInfo.id,
                });
                dispatch(closeModal());
                refetchWebsites();
            } catch (err: any) {
                console.error(
                    'Error creating website:',
                    err.data?.message || err.message
                );
            }
        } else {
            console.error('Please select a template');
        }
    };

    return (
        <AntModal
            title="Create Website"
            open={isOpen}
            onCancel={() => dispatch(closeModal())}
            footer={[
                <Button key="back" onClick={() => dispatch(closeModal())}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleCreateWebsite}
                >
                    Create
                </Button>,
            ]}
        >
            <Row gutter={[16, 16]}>
                {templates.map((template) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={template}>
                        {' '}
                        <Card
                            hoverable
                            onClick={() => handleTemplateSelect(template)}
                            bordered={true}
                            style={
                                selectedTemplate === template
                                    ? activeCardStyle
                                    : {}
                            }
                        >
                            {template}
                        </Card>
                    </Col>
                ))}
            </Row>
        </AntModal>
    );
};

export default CreateWebsiteModal;
