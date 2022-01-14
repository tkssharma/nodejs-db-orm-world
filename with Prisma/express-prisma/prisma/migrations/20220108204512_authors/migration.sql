/*
  Warnings:

  - You are about to drop the `account_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_bank_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_bank_account" DROP CONSTRAINT "user_bank_account_user_id_fkey";

-- DropTable
DROP TABLE "account_users";

-- DropTable
DROP TABLE "user_bank_account";

-- CreateTable
CREATE TABLE "author" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "account_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author.unique_emails" ON "author"("email");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
