import Link from 'next/link';
import { Card as AntCard } from 'antd';
import { fetchProjects } from '@/lib/modules/projects/data';
import { ProjectField } from '@/lib/core/definitions';
import { Col, Row } from 'antd';

export default async function ProjectsCardWrapper() {
    const data = await fetchProjects();

    return (
        <>
            <Row gutter={16}>
                {data.map((project) => (
                    <Col
                        key={project.id}
                        className="gutter-row"
                        span={6}
                    >
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export function ProjectCard({
    project,
}: {
    project: ProjectField;
}) {
    return (
        <Link
            href={`/dashboard/projects/${project.id}`}
        >
            <AntCard
                hoverable
                style={{ width: '100%' }}
            >
                <p>{project.name}</p>
            </AntCard>
        </Link>
    );
}
