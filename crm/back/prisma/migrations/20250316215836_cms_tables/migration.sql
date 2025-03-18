-- CreateTable
CREATE TABLE "Cms" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "wesiteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "data" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Cms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CmsEntry" (
    "id" SERIAL NOT NULL,
    "cmsId" INTEGER NOT NULL,
    "data" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "CmsEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cms" ADD CONSTRAINT "Cms_wesiteId_fkey" FOREIGN KEY ("wesiteId") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cms" ADD CONSTRAINT "Cms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CmsEntry" ADD CONSTRAINT "CmsEntry_cmsId_fkey" FOREIGN KEY ("cmsId") REFERENCES "Cms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
