import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';
import {
    CustomerField,
    CustomersTableType,
    InvoiceForm,
    InvoicesTable,
    InvoiceStatus,
    LatestInvoiceRaw,
    Revenue,
} from './definitions';
import { formatCurrency } from './utils';

const prisma = new PrismaClient();

export async function fetchRevenue() {
    try {
        console.log('Fetching revenue data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));

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

export async function fetchCardData() {
    try {
        // You can probably combine these into a single SQL query
        // However, we are intentionally splitting them to demonstrate
        // how to initialize multiple queries in parallel with JS.
        // const invoiceCountPromise = sql`SELECT COUNT(*) FROM Invoice`;
        // const customerCountPromise = sql`SELECT COUNT(*) FROM Customer`;
        // const invoiceStatusPromise = sql`SELECT
        //  SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        //  SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        //  FROM Invoice`;

        const invoiceCountPromise = prisma.invoice.count();
        const customerCountPromise = prisma.customer.count();
        const paidSumPromise = prisma.invoice.aggregate({
            where: { status: 'paid' },
            _sum: { amount: true },
        });
        const pendingSumPromise = prisma.invoice.aggregate({
            where: { status: 'pending' },
            _sum: { amount: true },
        });

        const [invoiceCount, customerCount, paidSum, pendingSum] = await Promise.all([
            invoiceCountPromise,
            customerCountPromise,
            paidSumPromise,
            pendingSumPromise,
        ]);

        const numberOfInvoices = invoiceCount;
        const numberOfCustomers = customerCount;
        const totalPaidInvoices = formatCurrency(paidSum._sum.amount ?? 0);
        const totalPendingInvoices = formatCurrency(pendingSum._sum.amount ?? 0);

        return {
            numberOfCustomers,
            numberOfInvoices,
            totalPaidInvoices,
            totalPendingInvoices,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch card data.');
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
