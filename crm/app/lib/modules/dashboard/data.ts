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