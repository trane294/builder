import { ModalProps } from './EntryModal';
import { Modal } from 'antd';

const SampleModal = (ModalProps: ModalProps) => {
    const { id, zIndex, props, callbacks } = ModalProps;
    const { isOpen } = props;

    return (
        <Modal
            title={props.modalTitle || 'Modal'}
            open={isOpen}
            onCancel={() => callbacks.handleClose()}
            footer={null}
            width={props.modalWidth || 1000}
            zIndex={zIndex}
        >
            <div>Sample Modal</div>
        </Modal>
    );
};

export default SampleModal;
