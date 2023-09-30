/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - The required column `account_id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "account_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_account_id_key" ON "Account"("account_id");
