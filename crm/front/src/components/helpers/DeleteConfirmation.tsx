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
    const handleConfirm = (
        e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ): void => {
        if (e) e.stopPropagation();
        if (onDelete && typeof onDelete === 'function') {
            onDelete();
        }
        // message.success(`${itemName} deleted successfully`);
    };

    const handleCancel = (
        e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
    ): void => {
        if (e) e.stopPropagation();
        // message.info('Delete cancelled');
    };

    return (
        <Popconfirm
            title={title || `Delete the ${itemName}`}
            description={
                description ||
                `Are you sure you want to delete this ${itemName}?`
            }
            onConfirm={(e) => handleConfirm(e)}
            onCancel={(e) => handleCancel(e)}
            okText="Yes"
            cancelText="No"
            placement={placement}
            styles={{
                root: { width: 250 },
            }}
            classNames={{
                root: 'custom-popconfirm',
            }}
            onPopupClick={(e) => e.stopPropagation()}
        >
            {children}
        </Popconfirm>
    );
};

// Add CSS to adjust font size
const style = document.createElement('style');
style.textContent = `
    .custom-popconfirm .ant-popconfirm-description {
        font-size: 10px;
    }
    .custom-popconfirm .ant-popconfirm-title {
        font-size: 12px;
    }
`;
document.head.appendChild(style);

export default DeleteConfirmation;