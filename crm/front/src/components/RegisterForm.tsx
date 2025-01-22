import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { registerUser } from 'src/features/auth/authActions';
import { useNavigate } from 'react-router';

type FieldType = {
    username?: string;
    password?: string;
    passwordConfirm?: string;
    remember?: string;
};

const RegisterForm = () => {
    const navigate = useNavigate();
    const { loading, userToken, error, success } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            username: 'John Doe',
            password: 'password1',
            passwordConfirm: 'password1'
        });
    }, []);

    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login');
    }, [navigate, userToken, success]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        dispatch(registerUser({
            firstName: 'John',
            email: 'john@email.com',
            password: 'password1',
            passwordConfirm: 'password1'
        }));
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="passwordConfirm"
                rules={[{ required: true, message: 'Please input your password coonfirmation!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    { loading ? 'Loading' : 'Submit' }
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;