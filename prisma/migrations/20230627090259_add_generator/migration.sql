-- CreateTable
CREATE TABLE "generators" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER,
    "image" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generators_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "generators" ADD CONSTRAINT "generators_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
