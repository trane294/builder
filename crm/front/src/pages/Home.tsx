import type { RootState } from 'src/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'src/features/counter/counterSlice';
import { NavLink } from 'react-router';
import { useGetWebsitesQuery } from 'src/services/website/websiteService';
import { IWebsite } from 'src/types';
import EntryModal from 'src/modals/EntryModal';
import { openModal } from 'src/features/modal/modalSlice';
import { Button, List } from 'antd';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { data: projects, isLoading, error } = useGetWebsitesQuery();

    const handleOpenModal = () => {
        dispatch(openModal({ componentName: 'CreateWebsiteModal' }));
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <h1>{t('welcome')}</h1>
                <p>{t('description')}</p>
                <p>{t('hello')}</p>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('ru')}>Russian</button>
                <br /><br />
            </div>
            <div>
                <Button type={'primary'} onClick={handleOpenModal}>
                    Create Project
                </Button>
                <br />
                <br />
            </div>
            <div>
                {projects && (
                    <List
                        dataSource={projects}
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
