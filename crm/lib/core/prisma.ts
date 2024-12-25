import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add Soft Delete Middleware
prisma.$use(async (params, next) => {
    // For example, if your pivot table model is named `UserRole` or `PostTag`, skip the soft-delete logic
    const modelsToExclude = ['Revenue'];

    if (modelsToExclude.includes(params.model ?? '')) {
        // Just run the query as-is for these models
        return next(params);
    }

    // 1. Intercept DELETE
    if (params.action === 'delete') {
        // Instead of actually deleting the record, update the deletedAt column
        params.action = 'update';
        params.args.data = { deletedAt: new Date() };
    }

    // 2. Intercept DELETE_MANY
    if (params.action === 'deleteMany') {
        // Instead of actually deleting the records, update the deletedAt column
        params.action = 'updateMany';

        // If data doesn't exist, create it
        if (!params.args.data) {
            params.args.data = {};
        }

        params.args.data.deletedAt = new Date();
    }

    // 3. Intercept FIND queries (findUnique, findFirst, findMany)
    //    to exclude records where deletedAt is not null
    if (params.action === 'findUnique' || params.action === 'findFirst') {
        // Check if 'deletedAt' is explicitly set in the where clause
        if (params.args.where && params.args.where.deletedAt === undefined) {
            // Only fetch records where deletedAt is null
            params.args.where.deletedAt = null;
        }
    }

    if (params.action === 'findMany') {
        if (!params.args.where) {
            params.args.where = {};
        }
        if (params.args.where.deletedAt === undefined) {
            params.args.where.deletedAt = null;
        }
    }

    return next(params);
});

export default prisma;
