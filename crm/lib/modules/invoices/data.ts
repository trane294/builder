import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    InvoiceStatus,
    LatestInvoiceRaw,
    Revenue,
} from '@/lib/core/definitions';
import { formatCurrency } from '@/lib/core/utils';
import prisma from '../../core/prisma';

export async function fetchRevenue() {
    try {
        console.log('Fetching revenue data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await prisma.revenue.findMany();

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchLatestInvoices() {
    try {
        const data = await prisma.invoice.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: {
                customer: {
                    select: {
                        name: true,
                        image_url: true,
                        email: true,
                    },
                },
            },
        });

        const latestInvoices = data.map((invoice) => ({
            ...invoice,
            amount: formatCurrency(invoice.amount),
        }));

        return latestInvoices;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the latest invoices.');
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
    query: string,
    currentPage: number,
) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const orConditions: any[] = [
        { customer: { name: { contains: query, mode: 'insensitive' } } },
        { customer: { email: { contains: query, mode: 'insensitive' } } },
        { status: { contains: query, mode: 'insensitive' } },
    ];

    const parsedAmount = parseInt(query, 10);
    if (!isNaN(parsedAmount)) {
        // This tries exact matching on amount, since partial matching on an integer field isn't supported.
        orConditions.push({ amount: parsedAmount });
    }

    const parsedDate = new Date(query);
    if (!isNaN(parsedDate.getTime())) {
        // This tries an exact match on date
        orConditions.push({ date: parsedDate });
    }

    try {
        const invoices = await prisma.invoice.findMany({
            skip: offset,
            take: ITEMS_PER_PAGE,
            where: {
                OR: orConditions,
            },
            include: {
                customer: {
                    select: {
                        name: true,
                        email: true,
                        image_url: true,
                    },
                },
            },
            orderBy: {
                date: 'desc',
            },
        });

        const results: InvoicesTable[] = invoices.map((inv) => ({
            id: inv.id,
            customer_id: inv.customer_id,
            amount: inv.amount,
            date: inv.date.toISOString(),
            status: inv.status as InvoiceStatus,
            name: inv.customer.name,
            email: inv.customer.email,
            image_url: inv.customer.image_url,
        }));

        return results;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
}

export async function fetchInvoicesPages(query: string) {
    const orConditions: any[] = [
        { customer: { name: { contains: query, mode: 'insensitive' } } },
        { customer: { email: { contains: query, mode: 'insensitive' } } },
        { status: { contains: query, mode: 'insensitive' } },
    ];

    const parsedAmount = parseInt(query, 10);
    if (!isNaN(parsedAmount)) {
        orConditions.push({ amount: parsedAmount });
    }

    const parsedDate = new Date(query);
    if (!isNaN(parsedDate.getTime())) {
        orConditions.push({ date: parsedDate });
    }

    try {
        const totalCount = await prisma.invoice.count({
            where: {
                OR: orConditions,
            },
        });

        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchInvoiceById(id: string) {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: { id },
            select: {
                id: true,
                customer_id: true,
                amount: true,
                status: true,
            },
        });

        if (!invoice) return null;

        const invoiceForm: InvoiceForm = {
            id: invoice.id,
            customer_id: invoice.customer_id,
            amount: invoice.amount / 100,
            status: invoice.status as InvoiceStatus,
        };

        return invoiceForm;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
}