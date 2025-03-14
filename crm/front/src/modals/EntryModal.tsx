import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import { Modal as AntModal } from 'antd';
import CreateWebsiteModal from 'src/modals/CreateWebsiteModal';
import WebsiteSettingsModal from 'src/modals/WebsiteSettingsModal';
import SubscriptionModal from 'src/modals/SubscriptionModal';
import FormBuilderModal from 'src/modals/FormBuilderModal';

const EntryModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, modalTitle, componentName, modalWidth, props } =
        useSelector((state: RootState) => state.modal);

    if (!componentName) return null;

    const Modals: {
        [key in string]: React.FC<any>;
    } = {
        CreateWebsiteModal: CreateWebsiteModal,
        WebsiteSettingsModal: WebsiteSettingsModal,
        SubscriptionModal: SubscriptionModal,
        FormBuilderModal: FormBuilderModal,
    };

    const Modal = Modals[componentName];

    const handleClose = (result?: any) => {
        dispatch(closeModal(result));
    };

    return (
        <AntModal
            title={modalTitle || 'Modal'}
            open={isOpen}
            onCancel={() => handleClose()}
            footer={null}
            width={modalWidth || 700}
        >
            <Modal {...props} onComplete={handleClose} />
        </AntModal>
    );
};

export default EntryModal;
