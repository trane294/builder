import { db } from '@vercel/postgres';
import prisma from '@/app/lib/core/prisma';

async function listInvoices() {
    const data = await prisma.invoice.findMany({
        select: {
            amount: true,
            customer: {
                select: {
                    name: true
                }
            },
        },
        where: {
            // amount: 666
            // deletedAt: null
        }
    });

    // Transform the data to match the original SQL query structure
    return data.map(invoice => ({
        amount: invoice.amount,
        name: invoice.customer.name
    }));
}

export async function GET() {
    // return Response.json({
    //     message:
    //         'Uncomment this file and remove this line. You can delete this file when you are finished.',
    // });

    try {
        return Response.json(await listInvoices());
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
