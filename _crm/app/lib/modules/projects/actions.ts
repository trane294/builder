'use server';

import { Data } from '@measured/puck';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/core/prisma';

export async function updateProject(
    id: string,
    data: Partial<Data>,
    pagePath: string
) {
    try {
        await prisma.project.update({
            where: {
                id: id
            },
            data: {
                template: data
            },
        });
    } catch (error) {
        // console.log(error.stack);

        return { message: 'Database Error: Failed to update Project.' };
    }

    revalidatePath(pagePath);

    // const payload = await request.json();

    // const existingData = JSON.parse(
    //     fs.existsSync('database.json')
    //         ? fs.readFileSync('database.json', 'utf-8')
    //         : '{}'
    // );

    // const updatedData = {
    //     ...existingData,
    //     [payload.path]: payload.data,
    // };

    // fs.writeFileSync('database.json', JSON.stringify(updatedData));

    // // Purge Next.js cache
    // revalidatePath(payload.path);

    // return NextResponse.json({
    //     status: 'ok'
    // });
}