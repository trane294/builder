import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { closeModal } from 'src/features/modal/modalSlice';
import {
    Modal as AntModal,
    Button,
    Col,
    Input,
    InputRef,
    Row,
    Space,
    Typography,
    Popover,
    Form,
    Select,
    Switch,
} from 'antd';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';
import { DeleteOutlined, DragOutlined, EditOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;

// Define the type for an FInput item
interface FInputItem {
    id: string;
    label: string;
    type: 'email' | 'text' | 'textarea';
    minLength?: number;
    maxLength?: number;
    isRequired?: boolean;
}

// FInput component
interface FInputProps {
    item: FInputItem;
    index: number;
    onUpdate: (id: string, updatedItem: Partial<FInputItem>) => void;
}

const FInput: React.FC<FInputProps> = ({ item, index, onUpdate }) => {
    const [form] = Form.useForm();
    const [editOpen, setEditOpen] = useState(false);

    const handleEditSubmit = (values: any) => {
        // Ensure isRequired is properly typed as a boolean
        const updatedValues = {
            ...values,
            isRequired: Boolean(values.isRequired)
        };
        onUpdate(item.id, updatedValues);
        setEditOpen(false);
    };

    const editContent = (
        <div style={{ width: 300 }}>
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    label: item.label,
                    type: item.type,
                    minLength: item.minLength || 0,
                    maxLength: item.maxLength || 100,
                    isRequired: item.isRequired || false,
                }}
                onFinish={handleEditSubmit}
            >
                <Form.Item
                    name="label"
                    label="Label"
                    rules={[
                        { required: true, message: 'Please enter a label' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Input Type"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="text">Text</Option>
                        <Option value="email">Email</Option>
                        <Option value="textarea">Textarea</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="minLength"
                    label="Min Length"
                    rules={[{ type: 'number', min: 0 }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>
                <Form.Item
                    name="maxLength"
                    label="Max Length"
                    rules={[{ type: 'number', min: 1 }]}
                >
                    <Input type="number" min={1} />
                </Form.Item>
                <Form.Item
                    name="isRequired"
                    label="Required Field"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Space
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button onClick={() => setEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            OK
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );

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
                        <Popover
                            content={editContent}
                            title="Edit Field"
                            trigger="click"
                            open={editOpen}
                            onOpenChange={setEditOpen}
                        >
                            <Button type="link" icon={<EditOutlined />} />
                        </Popover>
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
        { id: 'email', label: 'Email', type: 'email', isRequired: true },
        { id: 'name', label: 'Name', type: 'text', isRequired: true },
        { id: 'message', label: 'Message', type: 'textarea', isRequired: false },
    ]);

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(formInputs);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setFormInputs(items);
    };

    const handleUpdateInput = (
        id: string,
        updatedItem: Partial<FInputItem>
    ) => {
        setFormInputs((prevInputs) =>
            prevInputs.map((input) =>
                input.id === id ? { ...input, ...updatedItem } : input
            )
        );
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
                        <Text strong>
                            {item.label}:{item.isRequired && <span style={{ color: 'red' }}> *</span>}
                        </Text>
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
                                            onUpdate={handleUpdateInput}
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
