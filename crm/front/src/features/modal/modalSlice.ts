import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    modalTitle: string;
    modalWidth?: number;
    componentName: string | null;
    props: any;
    onComplete?: (result?: any) => void;
}

const initialState: ModalState = {
    isOpen: false,
    modalTitle: 'Modal',
    modalWidth: 700,
    componentName: null,
    props: {},
    onComplete: undefined,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{
                modalTitle: string;
                modalWidth?: number;
                componentName: string;
                props?: any;
                onComplete?: (result?: any) => void;
            }>
        ) => {
            state.isOpen = true;
            state.modalTitle = action.payload.modalTitle;
            state.modalWidth = action.payload.modalWidth;
            state.componentName = action.payload.componentName;
            state.props = action.payload.props || {};
            state.onComplete = action.payload.onComplete;
        },
        closeModal: (state, action: PayloadAction<any>) => {
            if (state.onComplete) {
                state.onComplete(action.payload);
            }

            state.isOpen = false;
            state.componentName = null;
            state.props = {};
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;