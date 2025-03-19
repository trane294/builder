import { NavLink } from 'react-router';
import { useGetWebsitesQuery } from 'src/services/website/websiteService';
import { IWebsite } from 'src/types';
import { Button, Card, List, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { CrownOutlined } from '@ant-design/icons';
import { useAppSelector } from 'src/hooks';
import { useModal } from 'src/hooks/useModal';

function Home() {
    const { t, i18n } = useTranslation();
    const { data: websites, isLoading, error } = useGetWebsitesQuery();
    const { userInfo } = useAppSelector((state) => state.auth);
    const { openModal: openCreateWebsiteModal } = useModal();
    const { openModal: openSubscriptionModal } = useModal();
    const { openModal: openFormBuilderModal } = useModal();

    const userSubscription = userInfo?.subscription || {
        permissions: {
            canCreate: true,
            canPublish: false,
        },
        publishLimit: 0,
        expiresAt: null,
        plan: 'free',
    };

    const getPublishedCount = () => {
        return websites?.filter((website) => website.isPublished)?.length || 0;
    };

    const handleOpenModal = () => {
        openCreateWebsiteModal('CreateWebsiteModal', {
            modalTitle: 'Create Website',
            componentName: 'CreateWebsiteModal',
        });
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const handleOpenSubscriptionModal = () => {
        openSubscriptionModal('SubscriptionModal');
    };

    const handleFormBuilderModal = () => {
        openFormBuilderModal('FormBuilderModal', {
            modalTitle: 'Form Builder',
            modalWidth: 1000,
            componentName: 'FormBuilderModal',
        }, {
                onSave: (formInputs: any) => {
                    console.log(formInputs);
                }
            }
        );
    };

    // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <FormBuilderModal
                visible={isModalVisible}
                onCancel={handleCancel}
            />*/}
            <button onClick={handleFormBuilderModal}>Show Modal</button>
            <div>
                <h1>{t('welcome')}</h1>
                <p>{t('description')}</p>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('ru')}>Russian</button>
                <br />
                <br />
            </div>
            <div className="subscription-status">
                <Card title="Subscription Status" size="small">
                    <p>
                        Current Plan:{' '}
                        <Tag
                            color={
                                userSubscription.plan === 'free'
                                    ? 'default'
                                    : 'gold'
                            }
                        >
                            {userSubscription.plan}
                        </Tag>
                    </p>
                    <p>
                        Published Sites: {getPublishedCount()} /
                        {userSubscription.publishLimit === -1
                            ? '∞'
                            : userSubscription.publishLimit}
                    </p>
                    {userInfo?.subscription?.expiresAt && (
                        <p>
                            Expires:{' '}
                            {new Date(
                                userInfo.subscription.expiresAt
                            ).toLocaleDateString()}
                        </p>
                    )}
                    <Button
                        type="primary"
                        icon={<CrownOutlined />}
                        onClick={handleOpenSubscriptionModal}
                    >
                        {userSubscription.plan === 'free'
                            ? 'Upgrade to Premium'
                            : 'Manage Subscription'}
                    </Button>
                </Card>
                <br />
                <br />
            </div>
            <div>
                <Button type={'primary'} onClick={handleOpenModal}>
                    Create Project
                </Button>
                <br />
                <br />
            </div>
            <div>
                {websites && (
                    <List
                        dataSource={websites}
                        renderItem={(project: IWebsite, key: number) => (
                            <List.Item
                                key={key}
                                actions={[
                                    <NavLink
                                        to={`/editor/${project.id}`}
                                        key="edit-link"
                                    >
                                        Edit
                                    </NavLink>,
                                ]}
                            >
                                <NavLink to={`/editor/${project.id}`}>
                                    {project.name}
                                </NavLink>
                            </List.Item>
                        )}
                    />
                )}
            </div>
        </>
    );
}

export default Home;
