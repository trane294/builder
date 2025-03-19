import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Card, Row, Col, message, Modal } from 'antd';
import {
    useCreateWebsiteMutation,
    useGetWebsitesQuery,
    useGetWebsiteTemplatesQuery,
} from 'src/services/website/websiteService';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { ITemplate } from 'src/types';
import ModalFooter from './ModalFooter';
import { ModalProps } from './EntryModal';
import { closeModal } from 'src/features/modal/modalSlice';

const activeCardStyle = {
    boxShadow:
        '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
};

const CreateWebsiteModal = (ModalProps: ModalProps) => {
    const { id, zIndex, props, callbacks } = ModalProps;
    const { userInfo } = useAppSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props && !isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [props]);

    const handleCloseModal = () => {
        dispatch(closeModal({ modal: 'CreateWebsiteModal', id }));
    };

    if (!userInfo) return null;

    const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | null>(
        null
    );
    const [createWebsite, { isLoading: isLoadingC, isError, error }] =
        useCreateWebsiteMutation();
    const {
        data: templates,
        isLoading: isLoadingT,
        isError: isErrorT,
        error: errorT,
    } = useGetWebsiteTemplatesQuery();
    const { refetch: refetchWebsites } = useGetWebsitesQuery();

    const handleTemplateSelect = (template: ITemplate) => {
        setSelectedTemplate(template);
    };

    const handleCreateWebsite = async () => {
        if (selectedTemplate) {
            try {
                const formattedDateTime =
                    DateTime.now().toFormat('dd.MM.yyyy HH:mm');
                await createWebsite({
                    name: 'Website ' + formattedDateTime,
                    templateId: selectedTemplate.id,
                    userId: userInfo.id,
                    data: {
                        '/': { root: { props: {} }, content: [], zones: {} },
                    },
                    metadata: {
                        pages: {
                            '/': {
                                title: '',
                                description: '',
                                ogImage: '',
                            },
                        },
                    },
                });

                message.success('Website created');
                await refetchWebsites();
            } catch (err: any) {
                message.error(
                    `Failed to delete website: ${
                        err.data?.message || err.message
                    }`
                );
                console.error('Error creating website:', err);
            } finally {
                callbacks.onComplete();
            }
        } else {
            message.info('Please select template');
        }
    };

    if (!templates || isLoadingT) {
        return <div>Loading...</div>;
    }

    return (
        <Modal
            title={props.modalTitle || 'Modal'}
            open={isOpen}
            onCancel={handleCloseModal}
            footer={null}
            width={props.modalWidth || 700}
            zIndex={zIndex}
        >
            <Row gutter={[16, 16]}>
                {templates.map((template, key) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={key}>
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
                            {template.name}
                        </Card>
                    </Col>
                ))}
            </Row>
            <ModalFooter
                onConfirm={handleCreateWebsite}
                confirmLoading={isLoadingC}
                onCancel={handleCloseModal}
            />
        </Modal>
    );
};

export default CreateWebsiteModal;
