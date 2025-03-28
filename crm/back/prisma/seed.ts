import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import {
    users,
    templates,
} from "./placeholder-data";

const prisma = new PrismaClient();

async function main() {
    // 1. Seed users
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hashedPassword,
            },
        });
    }
    // 2. Seed templates
    for (const template of templates) {
        const existingTemplate = await prisma.template.findFirst({
            where: { name: template.name },
        });

        if (existingTemplate) {
            await prisma.template.update({
                where: { id: existingTemplate.id },
                data: {
                    name: template.name,
                    config: template.config,
                    description: template.description,
                },
            });
        } else {
            await prisma.template.create({
                data: {
                    name: template.name,
                    config: template.config,
                    description: template.description,
                },
            });
        }
    }

    // // 2. Seed Customers
    // for (const customer of customers) {
    //     await prisma.customer.upsert({
    //         where: { id: customer.id },
    //         update: {},
    //         create: {
    //             id: customer.id,
    //             name: customer.name,
    //             email: customer.email,
    //             image_url: customer.image_url,
    //         },
    //     });
    // }

    // // // 3. Seed Invoices
    // for (const invoice of invoices) {
    //     await prisma.invoice.upsert({
    //         where: { id: invoice.id },
    //         update: {},
    //         create: {
    //             id: invoice.id,
    //             customer_id: invoice.customer_id,
    //             amount: invoice.amount,
    //             status: invoice.status,
    //             date: new Date(invoice.date),
    //         },
    //     });
    // }

    // // 4. Seed Revenue
    // for (const rev of revenue) {
    //     await prisma.revenue.upsert({
    //         where: { month: rev.month },
    //         update: {},
    //         create: {
    //             month: rev.month,
    //             revenue: rev.revenue,
    //         },
    //     });
    // }

    // // 5. Seed Projects
    // for (const project of projects) {
    //     await prisma.project.upsert({
    //         where: { id: project.id },
    //         update: {},
    //         create: {
    //             id: project.id,
    //             name: project.name,
    //             user_id: project.user_id,
    //         },
    //     });
    // }
}

main()
    .then(async () => {
        console.log("✅ Database seeded successfully!");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("Error seeding database: ", e);
        await prisma.$disconnect();
        process.exit(1);
    });
