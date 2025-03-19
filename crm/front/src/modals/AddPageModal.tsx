import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { ModalProps } from './EntryModal';
import { closeModal } from 'src/features/modal/modalSlice';
import { useAppDispatch } from 'src/hooks';

interface AddPageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPage: (path: string) => void;
}

const AddPageModal = (ModalProps: ModalProps) => {
    const { id, zIndex, props, callbacks } = ModalProps;
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isAdding, setIsAdding] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (props && !isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [props]);

    const handleCloseModal = () => {
        callbacks?.onClose();
        dispatch(closeModal({ modal: 'AddPageModal', id }));
    };

    const handleAddPage = async () => {
        try {
            setIsAdding(true);
            const values = await form.validateFields();
            let path = values.path;
            if (path === undefined) path = '/';
            // Validate the path format
            const regex = /^[a-zA-Z0-9\/-]+$/;
            if (!regex.test(path)) {
                message.error(
                    'Invalid path format. Only letters, numbers, hyphens, and forward slashes are allowed (no spaces).'
                );
                return;
            }
            if (path.length > 1 && path.startsWith('/')) {
                message.error(
                    'Invalid path format. Path should not start with /'
                );
                return;
            }

            callbacks.onAddPage(path);
            form.resetFields();
            handleCloseModal();
            setIsAdding(false);
        } catch (error) {
            setIsAdding(false);
        }
    };

    return (
        <Modal
            zIndex={zIndex}
            title="Add New Page"
            open={isOpen}
            onCancel={handleCloseModal}
            footer={[
                <Button key="cancel" onClick={handleCloseModal}>
                    Cancel
                </Button>,
                <Button
                    key="add"
                    type="primary"
                    loading={isAdding}
                    onClick={handleAddPage}
                >
                    Add
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="path"
                    label="Page url"
                >
                    <Input placeholder="e.g., about-us/team" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddPageModal;