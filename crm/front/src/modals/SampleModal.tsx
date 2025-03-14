import React from 'react';
import { openModal } from 'src/features/modal/modalSlice';
import { useAppDispatch } from 'src/hooks';

export const useSampleModal = () => {
    const dispatch = useAppDispatch();

    const openSampleModal = () => {
        dispatch(
            openModal({
                modalTitle: 'Form Builder',
                modalWidth: 1000,
                componentName: 'SampleModal',
            })
        );
    };

    return openSampleModal;
};

interface SampleModalProps {
    onComplete: (result?: any) => void;
}

const SampleModal: React.FC<SampleModalProps> = ({ onComplete }) => {
    return <div>Sample Modal</div>;
};

export default SampleModal;
