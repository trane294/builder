import { Card, Flex, Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAppSelector } from 'src/hooks';

const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: 'auto',
    height: '100vh',
};

const AuthLayout = () => {
    const navigate = useNavigate();
    const { userToken } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        // redirect authenticated user to profile screen
        if (userToken) navigate('/');
    }, [navigate, userToken]);

    return (
        <Layout style={layoutStyle}>
            <Content>
                <Flex
                    style={{ height: '100vh' }}
                    justify={'center'}
                    align={'center'}
                >
                    <Card style={{ width: '50%' }}>
                        <Outlet />
                    </Card>
                </Flex>
            </Content>
        </Layout>
    );
};

export default AuthLayout;