import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/core/prisma';

export async function POST(
    req: NextRequest,
    {
        params,
        body
    }: {
        params: {
            id: string
        },
        body: {
            path: string
        }
    }
) {
    const { id } = await params;
    const { path } = await req.json();

    const result = await prisma.project.findFirst({
        select: {
            id: true,
            name: true,
            template: true,
        },
        orderBy: {
            name: 'asc',
        },
        where: {
            id: id
        }
    });

    if (result === null) {
        return NextResponse.json(null, {
            status: 404,
        });
    }

    // TODO: fix to use proper type
    const template = (result.template ?? {}) as any;
    result.template = template;

    if (template[path] === undefined) {
        template[path] = {};
    }

    return NextResponse.json(template);
}