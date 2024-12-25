import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    InvoiceStatus,
    LatestInvoiceRaw,
    Revenue,
} from '@/app/lib/core/definitions';
import { formatCurrency } from '@/app/lib/core/utils';
import prisma from '../../core/prisma';

export async function fetchCustomers() {
    try {
        const customers = await prisma.customer.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        const results: CustomerField[] = customers.map((c) => ({
            id: c.id,
            name: c.name,
        }));

        return results;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchFilteredCustomers(query: string) {
    try {
        const customers = await prisma.customer.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                image_url: true,
                posts: {
                    select: {
                        id: true,
                        amount: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        const customerTable = customers.map((customer) => {
            const totalInvoices = customer.posts.length;
            let totalPending = 0;
            let totalPaid = 0;

            customer.posts.forEach((inv) => {
                if (inv.status === 'pending') totalPending += inv.amount;
                if (inv.status === 'paid') totalPaid += inv.amount;
            });

            return {
                id: customer.id,
                name: customer.name,
                email: customer.email,
                image_url: customer.image_url,
                total_invoices: totalInvoices,
                total_pending: formatCurrency(totalPending),
                total_paid: formatCurrency(totalPaid),
            };
        });

        return customerTable;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch customer table.');
    }
}
