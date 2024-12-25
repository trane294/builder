import {
    ProjectField
} from '@/lib/core/definitions';
import prisma from '../../core/prisma';

export async function fetchProjects() {
    try {
        const projects = await prisma.project.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        const results: ProjectField[] = projects.map((c) => ({
            id: c.id,
            name: c.name,
        }));

        return results;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all projects.');
    }
}