import type { RootState } from 'src/store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from 'src/features/counter/counterSlice';
import { NavLink } from 'react-router';
import { useGetWebsitesQuery } from 'src/services/website/websiteService';
import { IWebsite } from 'src/types';
import CreateWebsiteModal from 'src/modals/CreateWebsiteModal';
import { openModal } from 'src/features/modal/modalSlice';
import { Button } from 'antd';

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
                {projects &&
                    projects.map((project: IWebsite, key: number) => (
                        <div key={key}>
                            <NavLink to={`/project/${project.id}`}>
                                {project.name}
                            </NavLink>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Home;
