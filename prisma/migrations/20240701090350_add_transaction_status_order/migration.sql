/*
  Warnings:

  - Added the required column `transaction_status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transaction_status" TEXT NOT NULL;
