import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import fs from 'fs';
import prisma from '@/app/lib/core/prisma';

export async function GET(request: Request) {
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
            id: '410544b2-4001-4271-3451-fec4b6a6442a'
        }
    });

    return NextResponse.json({
        project: result
    });
}

export async function POST(request: Request) {
    const payload = await request.json();

    const existingData = JSON.parse(
        fs.existsSync('database.json')
            ? fs.readFileSync('database.json', 'utf-8')
            : '{}'
    );

    const updatedData = {
        ...existingData,
        [payload.path]: payload.data,
    };

    fs.writeFileSync('database.json', JSON.stringify(updatedData));

    // Purge Next.js cache
    revalidatePath(payload.path);

    return NextResponse.json({
        status: 'ok'
    });
}
