https://www.prisma.io/docs/orm/prisma-migrate/getting-started

To add new migrations:
`pnpm prisma migrate dev --name added_example_column`
`pnpm prisma generate`

Production:
`pnpm prisma migrate deploy`

To push changes:
`pnpm prisma db push`

```
Mixing db push and migrations.

db push updates the DB schema instantly but does not record changes in migration history. This can cause “drift.”
Use migrate dev to ensure changes are tracked by migration files.
```