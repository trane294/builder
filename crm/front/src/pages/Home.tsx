import type { RootState } from 'src/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'src/features/counter/counterSlice';
import { NavLink } from 'react-router';
import { useGetWebsitesQuery } from 'src/services/website/websiteService';
import { IWebsite } from 'src/types';
import EntryModal from 'src/modals/EntryModal';
import { openModal } from 'src/features/modal/modalSlice';
import { Button, List } from 'antd';

function Home() {
    const dispatch = useDispatch();
    const { data: projects, isLoading, error } = useGetWebsitesQuery();

    const handleOpenModal = () => {
        dispatch(openModal({ componentName: 'CreateWebsiteModal' }));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
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
