import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { loginUser } from 'src/features/auth/authActions';

type LoginFieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LoginForm = () => {
    const { loading, userToken, error, success } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            username: 'John Doe',
            password: 'password1'
        });
    }, []);

    // form.setFields([
    //     {
    //       name: 'field-to-update',
    //       errors: ['error-string'],
    //     },
    //  ]);

    const onFinish: FormProps<LoginFieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        dispatch(loginUser({
            firstName: 'John',
            email: 'john@email.com',
            password: 'password1',
            passwordConfirm: 'password1'
        }));
    };

    const onFinishFailed: FormProps<LoginFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="login"
            form={form}
            layout={'vertical'}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<LoginFieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<LoginFieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<LoginFieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    {loading ? 'Loading' : 'Submit'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;