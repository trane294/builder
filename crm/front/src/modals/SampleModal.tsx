import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import { Modal as AntModal, Button } from 'antd';

const SampleModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, props } = useSelector((state: RootState) => state.modal);

    return (
        <AntModal
            title="Website Settings"
            open={isOpen}
            onCancel={() => dispatch(closeModal())}
            footer={[
                <Button key="back" onClick={() => dispatch(closeModal())}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    form="myForm"
                    htmlType="submit"
                >
                    Save
                </Button>,
            ]}
        >
            Sample Modal
        </AntModal>
    );
};

export default SampleModal;
