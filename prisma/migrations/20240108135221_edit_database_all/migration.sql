/*
  Warnings:

  - You are about to drop the column `transactioId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_transactioId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transactioId",
ADD COLUMN     "transactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_transactionId_key" ON "Order"("transactionId");
