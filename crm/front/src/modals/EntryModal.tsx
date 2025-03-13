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
    const { isOpen, componentName, props } = useSelector(
        (state: RootState) => state.modal
    );

    if (!componentName) return null;

    const Modals: {
        [key in string]: React.FC;
    } = {
        CreateWebsiteModal: CreateWebsiteModal,
        WebsiteSettingsModal: WebsiteSettingsModal,
        SubscriptionModal: SubscriptionModal,
        FormBuilderModal: FormBuilderModal,
    };

    const Modal = Modals[componentName];

    return <Modal />;
};

export default EntryModal;
