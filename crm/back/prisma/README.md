# Prisma Commands and Usage Guide

This document outlines common Prisma commands and their usage, based on the official Prisma documentation: [https://www.prisma.io/docs/orm/prisma-migrate/getting-started](https://www.prisma.io/docs/orm/prisma-migrate/getting-started)

Dev only: npx prisma migrate dev --name init (will make first migration)

## 1. Setup and Initialization

*   **`npx prisma init`**

    *   **Description:** Initializes a new Prisma project.
    *   **Actions:**
        *   Creates a `prisma` directory with a `schema.prisma` file.
        *   Sets up a `.env` file for environment variables (e.g., database connection string).
    *   **Use Case:** Starting a new project.

## 2. Schema Management

*   **`npx prisma generate`**

    *   **Description:** Generates the Prisma Client based on your `schema.prisma` file.
    *   **Action:** Updates the client code (found in `node_modules/@prisma/client`).
    *   **Use Case:** Run after modifying your schema.

*   **`npx prisma format`**

    *   **Description:** Formats your `schema.prisma` file.
    *   **Action:** Ensures consistent syntax and styling.
    * **Use Case:** Keeping a good structure.

## 3. Database Migrations

*   **`npx prisma migrate dev`**

    *   **Description:** Creates and applies migrations to your database.
    *   **Actions:**
        *   Generates SQL migration files in `prisma/migrations/`.
        *   Updates the database schema.
    *   **Use Case:** Development environments (includes a reset if needed).

*   **`npx prisma migrate deploy`**

    *   **Description:** Applies existing migrations to a database.
    *   **Action:** Runs migrations that are already created.
    *   **Use Case:** Production environments (does not generate new migrations).

*   **`npx prisma migrate reset`**

    *   **Description:** Resets the database and reapplies all migrations.
    *   **Action:** Clears all data and recreates the database based on the migrations.
    *   **Use Case:** Development when you need a fresh start (data loss).

*   **`npx prisma migrate status`**

    *   **Description:** Checks the status of migrations.
    *   **Action:** Shows which migrations are applied or pending.
    *   **Use Case:** Get the current status of the migrations.

## 4. Database Interaction

*   **`npx prisma db pull`**

    *   **Description:** Introspects an existing database.
    *   **Action:** Generates a `schema.prisma` file based on the existing database structure.
    *   **Use Case:** Connecting Prisma to a pre-existing database.

*   **`npx prisma db push`**

    *   **Description:** Pushes the schema directly to the database.
    *   **Action:** Updates the database schema without creating migration files.
    *   **Use Case:** Prototyping or non-production environments (no migration history).

*   **`npx prisma db seed`**

    *   **Description:** Runs a seeding script.
    *   **Action:** Populates the database with initial data.
    *   **Use Case:** Database population.
    *   **Note:** Requires configuration in `package.json` or a custom script.

*   **`npx prisma db execute`**

    *   **Description:** Executes raw SQL scripts.
    *   **Action:** Runs custom SQL commands.
    *   **Use Case:** Custom database operations.

## 5. Prisma Studio

*   **`npx prisma studio`**

    *   **Description:** Launches Prisma Studio.
    *   **Action:** Opens a web-based GUI.
    *   **Use Case:** Explore and manage database data visually.
