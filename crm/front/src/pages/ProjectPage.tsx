import { Button } from 'antd';
import { Navigate, NavLink, useParams } from 'react-router';
import { useGetWebsiteByIdQuery } from 'src/services/website/websiteService';

function ProjectPage() {
    const { id } = useParams();

    if (!id) {
        return <Navigate to="/" replace />;
    }

    const {
        data: website,
        isLoading,
        isError,
        error,
    } = useGetWebsiteByIdQuery(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!website) {
        return <div>Error</div>;
    }

    return (
        <>
            <div>
                <div>
                    Website: {website.name}
                    <br />
                    <br />
                </div>

                <NavLink to={`/editor/${website.id}`}>
                    <Button htmlType="button">Edit</Button>
                </NavLink>
            </div>
        </>
    );
}

export default ProjectPage;
