import React from 'react';
import { Form, Input, Button } from 'antd';
import { Rule } from 'antd/es/form'; // Import Rule type

export interface FormField {
    id: string;
    label: string;
    type: 'email' | 'text' | 'textarea';
    minLength?: number;
    maxLength?: number;
    isRequired?: boolean;
}

interface FormPhoto1Props {
    formId?: string;
    formFields?: FormField[];
    submitButtonText?: string;
    onSubmit?: (values: any) => void;
}

const FormPhoto1: React.FC<FormPhoto1Props> = ({
    formFields = [
        { id: 'email', label: 'Email', type: 'email', isRequired: true },
    ],
    submitButtonText = 'Submit',
    onSubmit,
}) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        if (onSubmit) {
            console.log('Form submitted:', values);
            onSubmit(values);
        } else {
            console.log('Form submitted:', values);
        }
        form.resetFields();
    };

    return (
        <div
            className="form-container"
            style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                {formFields.map((field) => (
                    <Form.Item
                        key={field.id}
                        name={field.id}
                        label={
                            <span>
                                {field.label}
                                {field.isRequired && (
                                    <span style={{ color: 'red' }}> *</span>
                                )}
                            </span>
                        }
                        rules={[
                            {
                                required: !!field.isRequired,
                                message: `Please enter your ${field.label.toLowerCase()}`,
                            } as Rule,
                            ...(field.minLength
                                ? [
                                      {
                                          min: field.minLength,
                                          message: `${field.label} must be at least ${field.minLength} characters`,
                                      } as Rule,
                                  ]
                                : []),
                            ...(field.maxLength
                                ? [
                                      {
                                          max: field.maxLength,
                                          message: `${field.label} cannot exceed ${field.maxLength} characters`,
                                      } as Rule,
                                  ]
                                : []),
                            ...(field.type === 'email'
                                ? [
                                      {
                                          type: 'email' as const,
                                          message: 'Please enter a valid email',
                                      } as Rule,
                                  ]
                                : []),
                        ]}
                    >
                        {field.type === 'textarea' ? (
                            <Input.TextArea rows={4} />
                        ) : (
                            <Input type={field.type} />
                        )}
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        {submitButtonText}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormPhoto1;
