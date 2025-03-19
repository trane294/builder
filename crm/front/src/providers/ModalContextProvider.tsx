import React, { createContext, useRef } from 'react';

type ModalInputType = {
    modal: string;
    id: string;
    callbacks?: any;
}

export interface IModalContext {
    modalCallbacks: any;
    registerModalCallbacks: (payload: ModalInputType) => void;
    unregisterModalCallbacks: (payload: ModalInputType) => void;
}

export const ModalContext = createContext<IModalContext>({
    modalCallbacks: {},
    registerModalCallbacks: () => {},
    unregisterModalCallbacks: () => {},
});

interface ModalProviderProps {
    children: React.ReactNode;
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const modalCallbacksRef = useRef<any>({});

    const registerModalCallbacks = (payload: ModalInputType) => {
        const { modal, id, callbacks } = payload;
        if (!modalCallbacksRef.current[modal]) {
            modalCallbacksRef.current[modal] = {};
        }
        if (callbacks) {
            modalCallbacksRef.current[modal][id] = callbacks;
        }
    };

    const unregisterModalCallbacks = (payload: ModalInputType) => {
        const { modal, id } = payload;
        if (modalCallbacksRef.current[modal]) {
            delete modalCallbacksRef.current[modal][id];
        }
    };

    return (
        <ModalContext.Provider
            value={{
                modalCallbacks: modalCallbacksRef.current,
                registerModalCallbacks,
                unregisterModalCallbacks,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
