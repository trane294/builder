import { createSlice } from '@reduxjs/toolkit';

export type ModalNamesType =
    'CreateWebsiteModal' |
    'WebsiteSettingsModal' |
    'SubscriptionModal' |
    'FormBuilderModal' |
    'AddPageModal' |
    'SampleModal';

const initialState: any = {};

type ModalType = {
    id: string;
    modal: ModalNamesType;
    props?: any;
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state: any, action: { payload: ModalType }) => {
            const modal = action.payload.modal;
            const props = action.payload.props;
            const id = action.payload.id;
            if (!props) return;

            state[modal] = state[modal] || {};
            state[modal][id] = {
                ...props,
            };
        },
        closeModal: (state: any, action: { payload: ModalType }) => {
            const modal = action.payload.modal;
            const id = action.payload.id;
            delete state[modal][id];
        },
    },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
