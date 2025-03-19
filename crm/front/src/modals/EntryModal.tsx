import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal, ModalNamesType } from 'src/features/modal/modalSlice';
import { Modal as AntModal } from 'antd';
import CreateWebsiteModal from 'src/modals/CreateWebsiteModal';
import WebsiteSettingsModal from 'src/modals/WebsiteSettingsModal';
import SubscriptionModal from 'src/modals/SubscriptionModal';
import FormBuilderModal from 'src/modals/FormBuilderModal';
import { ModalContext } from 'src/providers/ModalContextProvider';
import AddPageModal from './AddPageModal';
import SampleModal from './SampleModal';

export type ModalProps = {
    id: string;
    zIndex: number;
    props: any;
    callbacks: any;
}

const EntryModal = () => {
    const { modalCallbacks } = useContext(ModalContext);
    const modals = useSelector((state: RootState) => state.modal);
    const modalKeys: ModalNamesType[] = Object.keys(modals) as ModalNamesType[];
    const modalComponents = {
        'CreateWebsiteModal': CreateWebsiteModal,
        'WebsiteSettingsModal': WebsiteSettingsModal,
        'SubscriptionModal': SubscriptionModal,
        'FormBuilderModal': FormBuilderModal,
        'AddPageModal': AddPageModal,
        'SampleModal': SampleModal,
    };
    const [zIndexes, setZIndexes] = useState<Record<string, number>>({});

    useEffect(() => {
        const ids = new Set<string>();
        for (const modalKey of modalKeys) {
            for (const id of Object.keys(modals[modalKey])) {
                ids.add(id);
            }
        }

        for (const id of Object.keys(zIndexes)) {
            if (!ids.has(id)) {
                delete zIndexes[id];
            }
        }
    }, [modals]);

    const getZIndex = (id: string) => {
        if (zIndexes[id]) return zIndexes[id];

        const values = Object.values(zIndexes);
        const maxZIndex = values.length
            ? Math.max(...values)
                : 0;
        zIndexes[id] = maxZIndex + 1000;
        setZIndexes(zIndexes);
        return zIndexes[id];
    }

    return (
        <>
            {modalKeys.map((modalKey: ModalNamesType) => {
                return Object.keys(modals[modalKey]).map((id) => {
                    const ModalComponent = modalComponents[modalKey] as React.FC<any>;
                    return (
                        <ModalComponent
                            key={id}
                            id={id}
                            props={modals[modalKey][id]}
                            callbacks={modalCallbacks[modalKey][id]}
                            zIndex={getZIndex(id)}
                        />
                    );
                });
            })}
        </>
    );
};

export default EntryModal;
