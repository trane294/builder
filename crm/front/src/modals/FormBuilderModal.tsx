import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import { Modal as AntModal, Button, Col, Input, InputRef, Row, Space, Typography } from 'antd';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { DeleteOutlined, DragOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Define the type for an FInput item
interface FInputItem {
    id: string;
    label: string;
    type: 'email' | 'text' | 'textarea';
}

// FInput component
interface FInputProps {
    item: FInputItem;
    index: number;
}

const FInput: React.FC<FInputProps> = ({ item, index }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px',
                        border: '1px solid #e8e8e8',
                        marginBottom: '8px',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        ...provided.draggableProps.style,
                    }}
                >
                    <DragOutlined
                        style={{ cursor: 'grab', marginRight: '8px' }}
                    />
                    <Text style={{ flexGrow: 1 }}>{item.label}</Text>
                    <Space>
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => {
                                console.log('Edit clicked for:', item.label);
                            }}
                        />
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                // Implement later
                                console.log('Delete clicked for:', item.label);
                            }}
                        />
                    </Space>
                </div>
            )}
        </Draggable>
    );
};

const FormBuilderModal: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, props } = useSelector((state: RootState) => state.modal);

    const [formInputs, setFormInputs] = useState<FInputItem[]>([
        { id: 'email', label: 'Email', type: 'email' },
        { id: 'name', label: 'Name', type: 'text' },
        { id: 'message', label: 'Message', type: 'textarea' },
    ]);

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(formInputs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormInputs(items);
    };

    const getFormPreview = () => {
        return (
            <div
                style={{
                    padding: '16px',
                    border: '1px solid #e8e8e8',
                    borderRadius: '4px',
                    minHeight: '200px',
                }}
            >
                {formInputs.map((item, index) => (
                    <div key={item.id} style={{ marginBottom: '10px' }}>
                        <Text strong>{item.label}:</Text>
                        {item.type === 'textarea' ? (
                            <Input.TextArea rows={3} disabled />
                        ) : (
                            <Input type={item.type} disabled />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <AntModal
            title="Form Builder"
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
            width={1000}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="form-inputs">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {formInputs.map((item, index) => (
                                        <FInput
                                            key={item.id}
                                            item={item}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Col>
                <Col span={12}>{getFormPreview()}</Col>
            </Row>
        </AntModal>
    );
};

export default FormBuilderModal;
