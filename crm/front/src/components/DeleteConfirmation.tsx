import React, { ReactNode } from 'react';
import { Popconfirm, message } from 'antd';

interface DeleteConfirmationProps {
    children: ReactNode;
    onDelete?: () => void;
    itemName?: string;
    title?: string;
    description?: string;
    placement?:
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight'
        | 'leftTop'
        | 'leftBottom'
        | 'rightTop'
        | 'rightBottom';
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
    children,
    onDelete,
    itemName = 'item',
    title,
    description,
    placement = 'topRight',
}) => {
    const handleConfirm = (): void => {
        // Call the provided delete handler
        if (onDelete && typeof onDelete === 'function') {
            onDelete();
        }
        // message.success(`${itemName} deleted successfully`);
    };

    const handleCancel = (): void => {
        // message.info('Delete cancelled');
    };

    return (
        <Popconfirm
            title={title || `Delete the ${itemName}`}
            description={
                description ||
                `Are you sure you want to delete this ${itemName}?`
            }
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            placement={placement}
        >
            {children}
        </Popconfirm>
    );
};

export default DeleteConfirmation;