import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { registerUser, RegisterUserArgs } from 'src/features/auth/authActions';
import { useNavigate } from 'react-router';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { loading, userToken, error, success } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@email.com',
            password: 'password1',
            passwordConfirm: 'password1'
        });
    }, []);

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login');
    }, [navigate, userToken, success]);

    const onFinish: FormProps<RegisterUserArgs>['onFinish'] = (values) => {
        console.log('Success:', values);
        dispatch(registerUser(values));
    };

    const onFinishFailed: FormProps<RegisterUserArgs>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="login"
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<RegisterUserArgs>
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<RegisterUserArgs>
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<RegisterUserArgs>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input type="email" />
            </Form.Item>

            <Form.Item<RegisterUserArgs>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<RegisterUserArgs>
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true, message: 'Please input your password confirmation!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
