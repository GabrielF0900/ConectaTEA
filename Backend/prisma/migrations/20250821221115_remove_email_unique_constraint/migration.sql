/*
  Warnings:

  - A unique constraint covering the columns `[email,telefone,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."User_email_key";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_telefone_name_key" ON "public"."User"("email", "telefone", "name");
