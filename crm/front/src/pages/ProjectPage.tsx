import { Button } from "antd";
import { NavLink } from "react-router";

function ProjectPage() {
    return (
        <>
            <div>
                <div>
                    Project
                </div>

                <NavLink to="/editor/1">
                    <Button htmlType="button">
                        Edit
                    </Button>
                </NavLink>
            </div>
        </>
    )
}

export default ProjectPage;