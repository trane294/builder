import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from 'src/providers/ModalContextProvider';
import { closeModal, openModal } from 'src/features/modal/modalSlice';
import type { ModalNamesType } from 'src/features/modal/modalSlice';

export function useOpenModal(id: string) {
    const dispatch = useDispatch();
    const { registerModalCallbacks } = useContext(ModalContext);
    return (
        modal: ModalNamesType,
        props?: any,
        callbacks?: any
    ) => {
        // Dispatch serializable props to Redux
        dispatch(openModal({ modal, id, props: props || {} }));
        // Register non-serializable callbacks in your context
        registerModalCallbacks({ modal, id, callbacks: callbacks || {} });
    };
}

export function useCloseModal(id: string) {
    const dispatch = useDispatch();
    const { unregisterModalCallbacks } = useContext(ModalContext);

    return (modal: ModalNamesType) => {
        dispatch(closeModal({ modal, id }));
        unregisterModalCallbacks({ modal, id });
    };
}

export function useModal() {
    const id = uuidv4();
    return {
        openModal: useOpenModal(id),
        closeModal: useCloseModal(id),
    };
}
