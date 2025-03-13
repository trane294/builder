import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Modal,
    Button,
    Card,
    Radio,
    Space,
    Typography,
    Row,
    Col,
    Tag,
    message,
} from 'antd';
import { CheckOutlined, CrownOutlined } from '@ant-design/icons';
import { closeModal } from 'src/features/modal/modalSlice';
import { useAppSelector } from 'src/hooks';
import { useUpgradeSubscriptionMutation } from 'src/services/subscription/subscriptionService';

const { Title, Text, Paragraph } = Typography;

const SubscriptionModal: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedPlan, setSelectedPlan] = useState<string>('pro');
    const [loading, setLoading] = useState(false);
    const { userInfo } = useAppSelector((state) => state.auth);
    const [upgradeSubscription, { isLoading }] = useUpgradeSubscriptionMutation();

    const currentPlan = userInfo?.subscription?.plan || 'free';

    const plans = [
        {
            id: 'pro',
            name: 'Pro',
            price: '$9.99',
            period: 'per month',
            publishLimit: 1,
            features: [
                'Publish 1 website',
                'Custom domain',
                'Remove ads',
                'Premium support',
            ],
        },
        {
            id: 'power',
            name: 'Power',
            price: '$24.99',
            period: 'per month',
            publishLimit: 3,
            features: [
                'Publish up to 3 websites',
                'Custom domains',
                'Remove ads',
                'Advanced analytics',
                'Priority support',
                'Access to premium templates',
            ],
            recommended: true,
        },
    ];

    const handleSubscribe = async () => {
        setLoading(true);

        try {
            // Call the API to get the payment URL or handle the subscription
            const result = await upgradeSubscription({
                planId: selectedPlan,
            }).unwrap();

            // If the backend returns a payment URL, redirect the user
            if (result?.paymentUrl) {
                window.location.href = result.paymentUrl;
            } else if (result?.success) {
                message.success('Subscription updated successfully!');
                dispatch(closeModal());
            }
        } catch (error) {
            message.error('Failed to process subscription');
            setLoading(false);
        }
    };

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CrownOutlined
                        style={{
                            color: '#faad14',
                            fontSize: 24,
                            marginRight: 8,
                        }}
                    />
                    <span>Upgrade Your Subscription</span>
                </div>
            }
            open={true}
            onCancel={() => dispatch(closeModal())}
            footer={null}
            width={700}
        >
            <Paragraph>
                Choose the right plan to grow your online presence. You're
                currently on the{' '}
                <Tag color={currentPlan === 'free' ? 'default' : 'gold'}>
                    {currentPlan}
                </Tag>{' '}
                plan.
            </Paragraph>

            <Row gutter={16} style={{ marginTop: 24 }}>
                {plans.map((plan) => (
                    <Col span={12} key={plan.id}>
                        <Card
                            hoverable
                            style={{
                                borderColor:
                                    selectedPlan === plan.id
                                        ? '#1890ff'
                                        : undefined,
                                borderWidth: selectedPlan === plan.id ? 2 : 1,
                                position: 'relative',
                                height: '100%',
                            }}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.recommended && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: -12,
                                        right: 16,
                                        background: '#52c41a',
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: 4,
                                        fontSize: '12px',
                                    }}
                                >
                                    BEST VALUE
                                </div>
                            )}

                            <Radio
                                checked={selectedPlan === plan.id}
                                style={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                }}
                            />

                            <Title level={4}>{plan.name}</Title>
                            <div
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    margin: '16px 0',
                                }}
                            >
                                {plan.price}
                                <Text
                                    type="secondary"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 'normal',
                                    }}
                                >
                                    {' '}
                                    {plan.period}
                                </Text>
                            </div>

                            <Paragraph>
                                <Text strong>
                                    Publish up to {plan.publishLimit}{' '}
                                    {plan.publishLimit === 1
                                        ? 'website'
                                        : 'websites'}
                                </Text>
                            </Paragraph>

                            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
                                {plan.features.map((feature, i) => (
                                    <li key={i} style={{ marginBottom: 8 }}>
                                        <CheckOutlined
                                            style={{
                                                color: '#52c41a',
                                                marginRight: 8,
                                            }}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleSubscribe}
                    loading={loading}
                    style={{ minWidth: 200 }}
                >
                    {currentPlan === 'free'
                        ? 'Subscribe Now'
                        : 'Update Subscription'}
                </Button>
            </div>
        </Modal>
    );
};

export default SubscriptionModal;
