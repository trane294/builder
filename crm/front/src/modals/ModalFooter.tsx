import React from 'react';
import { Button, Space } from 'antd';

interface ModalFooterProps {
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmLoading?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
    onConfirm,
    onCancel,
    confirmText = 'Save',
    cancelText = 'Cancel',
    confirmLoading = false,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '10px 0',
            }}
        >
            <Space>
                <Button
                    onClick={onCancel}
                >
                    {cancelText}
                </Button>
                <Button
                    type="primary"
                    onClick={onConfirm}
                    loading={confirmLoading}
                >
                    {confirmText}
                </Button>
            </Space>
        </div>
    );
};

export default ModalFooter;