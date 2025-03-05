import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    componentName: string | null;
    props: any;
}

const initialState: ModalState = {
    isOpen: false,
    componentName: null,
    props: {},
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<{ componentName: string; props?: any }>
        ) => {
            state.isOpen = true;
            state.componentName = action.payload.componentName;
            state.props = action.payload.props || {};

        },
        closeModal: (state) => {
            state.isOpen = false;
            state.componentName = null;
            state.props = {};
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;