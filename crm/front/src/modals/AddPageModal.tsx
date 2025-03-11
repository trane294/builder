import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

interface AddPageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPage: (path: string) => void;
}

const AddPageModal: React.FC<AddPageModalProps> = ({
    isOpen,
    onClose,
    onAddPage,
}) => {
    const [form] = Form.useForm();
    const [isAdding, setIsAdding] = useState(false);

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

            onAddPage(path);
            form.resetFields();
            onClose();
            setIsAdding(false);
        } catch (error) {
            setIsAdding(false);
        }
    };

    return (
        <Modal
            title="Add New Page"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
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